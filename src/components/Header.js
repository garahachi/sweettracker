import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
    Navbar,
    Nav,
    NavItem
} from 'reactstrap';

class Header extends Component {
    render() {
        return (
            <Navbar color="dark" dark expand="md">
                <Link to={'/'} className="navbar-brand">스마트택배 배송조회</Link>
                <Nav className="mr-auto" navbar>
                    <NavItem>
                        <hr color="gray" />
                    </NavItem>
                </Nav>
            </Navbar>
        );
    }
}

export default Header;
