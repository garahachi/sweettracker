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
            tCode: '',
            tInvoice: '',
            result: '',
            isCodeValid: false,
            isInvoiceValid: false,
            failMessage: ''
        };
    }

    // handleChange = (e) => {
    //     this.setState({
    //         [e.target.name]: e.target.value
    //     });
    // }

    validateInvoice = invoiceValue => {
        this.setState({ tInvoice: invoiceValue });
        if (invoiceValue.length > 0) {
            this.setState({ isInvoiceValid: true });
        } else {
            this.setState({ isInvoiceValid: false });
        }
    }

    isInvoiceValid = () => {
        const { tInvoice, isInvoiceValid } = this.state;
        if (tInvoice) return isInvoiceValid;
    }

    validateCode = codeValue => {
        this.setState({ tCode: codeValue });
        if (codeValue.length > 0) {
            this.setState({ isCodeValid: true });
        } else {
            this.setState({ isCodeValid: false });
        }
    }

    isCodeValid = () => {
        const { tCode, isCodeValid } = this.state;
        if (tCode) return isCodeValid;
    }

    inputClassNameHelper = boolean => {
        switch (boolean) {
            case true:
                return 'is-valid';
            case false:
                return 'is-invalid';
            default:
                return '';
        }
    }

    isEveryFieldValid = () => {
        const { isCodeValid, isInvoiceValid } = this.state;
        return isCodeValid && isInvoiceValid;
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            t_code: this.state.tCode,
            t_invoice: this.state.tInvoice
        };

        if (this.isEveryFieldValid()) {
            axios.post('http://localhost:4000/api/trackingInfo', data)
            .then(res => {
                // console.log(res.data);
                this.setState({
                    result: res.data,
                    failMessage: ''
                });
            })
            .catch(res => {
                this.setState({ failMessage: res.data });
            });
        } else {
            this.setState({ failMessage: '필수항목을 입력하세요.' });
        }
    }

    render() {
        let success = false;
        let trackingDetails = [];
        let items = []
        let failMessage = '';

        if (this.state.result) {
            if (this.state.result.status === false) {
                failMessage = this.state.result.msg;
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

        if (this.state.failMessage) {
            success = false;
            failMessage = this.state.failMessage;
        }

        return (
            <div className="login-card">
                <Card>
                    <CardBody>
                        <CardTitle>배송조회 API</CardTitle>
                        <Form onSubmit={this.handleSubmit}>
                            <FormGroup>
                                <InputGroup>
                                    <Input type="select" name="t_code" id="t_code" onChange={e => this.validateCode(e.target.value)} className={`${this.inputClassNameHelper(this.isCodeValid())}`}>
                                        <option value="">택배사 선택</option>
                                        <option value="04">CJ대한통운</option>
                                        <option value="05">한진택배</option>
                                        <option value="23">경동택배</option>
                                    </Input>
                                </InputGroup>
                                <InputGroup className="mt10">
                                    <Input type="text" name="t_invoice" id="t_invoice" placeholder="운송장 번호 입력" onChange={e => this.validateInvoice(e.target.value)} className={`${this.inputClassNameHelper(this.isInvoiceValid())}`} />
                                </InputGroup>
                                <InputGroup className="mt10">
                                    <Button color="secondary" className="btn-sm" block>조회</Button>
                                </InputGroup>
                            </FormGroup>
                        </Form>
                        {failMessage &&
                        <div>
                            <pre className="font_red">{failMessage}</pre>
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