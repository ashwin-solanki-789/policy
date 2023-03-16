import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, NavLink, useNavigate } from 'react-router-dom';

import { useAuthDispatch } from "../utils/setUserContext";

export default function Header({ user }) {

    const dispatch = useAuthDispatch();

    const navigate = useNavigate();

    return (
        <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
            <Container>
                <Navbar.Brand as={Link} to="/">Policy Checker</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                {user ? (
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link as={NavLink} to="/policy-calculation">Policy Calculation</Nav.Link>
                            <Nav.Link as={NavLink} to="/illustration">Illustration</Nav.Link>
                        </Nav>
                        <Nav>
                            <Navbar.Text>
                                Signed in as: <a href="#login">{user.name}</a>
                            </Navbar.Text>
                            <Nav.Link eventKey={2} onClick={() => { dispatch({ type: "LOGOUT" }); navigate('/login'); }}>
                                Logout
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                ) : null}
            </Container>
        </Navbar>
    )
}
