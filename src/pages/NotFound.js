import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Row, Button } from 'reactstrap';

export default class NotFound extends Component {
    render() {
        return (
            <div>
                <h3>요청한 페이지를 찾을 수 없습니다.</h3>
                <p>
                    요청하신 페이지는 삭제 되었거나 경로가 변경되어 찾을 수 없습니다.<br />
                    해당 URL을 다시 확인하거나 홈페이지로 넘어가시기 바랍니다.
                </p>
                <Row className="justify-content-md-center">
                    <Link to={'/'} className="navbar-brand">
                        <Button color="info">홈으로 가기</Button>
                    </Link>
                </Row>
            </div>
        )
    }
}