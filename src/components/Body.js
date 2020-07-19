import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import {
    Jumbotron,
    Container,
    Row,
    Col
} from 'reactstrap';
import {
    Search,
    NotFound
} from '../pages';

class Body extends Component {
    render() {
        return (
            <Jumbotron>
                <Container>
                    <Row className="justify-content-md-center">
                        <Col>
                            <Switch>
                                <Route exact path='/' component={Search} />
                                <Route path='*' component={NotFound} />
                            </Switch>
                        </Col>
                    </Row>
                </Container>
            </Jumbotron>
        );
    }
}

export default Body;
