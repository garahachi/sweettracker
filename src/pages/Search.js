import React, { Component } from 'react';
import {
    Form,
    FormGroup,
    InputGroup,
    Input,
    Button,
    Card,
    CardBody,
    CardTitle,
    Table
} from 'reactstrap';
import axios from 'axios';


export default class Search extends Component {
    constructor(props) {
        super(props);

        this.state = {
            t_code: '',
            t_invoice: '',
            result: ''
        };
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            t_code: this.state.t_code,
            t_invoice: this.state.t_invoice
        };

        axios.post('http://localhost:4000/api/trackingInfo', data)
        .then(res => {
            console.log(res.data);
            this.setState({ result: res.data });
        })
        .catch(res => console.log(res.data));
    }

    render() {
        let failMessage = '';
        let success = false;
        let trackingDetails = [];
        let items = []

        if (this.state.result) {
            if (this.state.result.status === false) {
                failMessage = this.state.result.msg
            } else if (this.state.result.result === 'Y') {
                success = true;
                trackingDetails = this.state.result.trackingDetails;

                if (trackingDetails.length > 0) {
                    trackingDetails = trackingDetails.reverse();
                    for (const [index, value] of trackingDetails.entries()) {
                        items.push(<tr key={index}>
                            <td>{value.timeString}</td>
                            <td>{value.where}</td>
                            <td>{value.kind}</td>
                            <td>{value.telno}</td>
                        </tr>);
                    }
                } else {
                    items.push(<tr key="1">
                        <td colSpan="4">아직 집하 전입니다.</td>
                    </tr>);
                }
            }
        }

        return (
            <div className="login-card">
                <Card>
                    <CardBody>
                        <CardTitle>배송조회 API</CardTitle>
                        <Form onSubmit={this.handleSubmit}>
                            <FormGroup>
                                <InputGroup>
                                    <Input type="select" name="t_code" id="t_code" onChange={this.handleChange}>
                                        <option>택배사 선택</option>
                                        <option value="04">CJ대한통운</option>
                                        <option value="05">한진택배</option>
                                        <option value="23">경동택배</option>
                                    </Input>
                                </InputGroup>
                                <InputGroup className="mt10">
                                    <Input type="text" name="t_invoice" id="t_invoice" placeholder="운송장 번호 입력" onChange={this.handleChange} />
                                </InputGroup>
                                <InputGroup className="mt10">
                                    <Button color="secondary" className="btn-sm" block>조회</Button>
                                </InputGroup>
                            </FormGroup>
                        </Form>
                        {failMessage &&
                        <div>
                            <pre>{failMessage}</pre>
                        </div>
                        }

                        {success &&
                        <Table>
                            <thead>
                                <tr>
                                    <th>날짜</th>
                                    <th>현재위치</th>
                                    <th>배송상태</th>
                                    <th>상세정보</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* {trackingDetails.reverse().map((value, index) => {
                                    return ;
                                })} */}
                                {items}
                            </tbody>

                        </Table>
                        }
                    </CardBody>
                </Card>
            </div>
        )
    }
}