import React, { useState } from "react";
import { Container, Button, Alert } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { Form } from "react-bootstrap";
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { useAuthDispatch } from "../utils/setUserContext";

export default function Login() {
  const [variables, setVariables] = useState({
    email: "",
    password: ""
  });

  const [error, setError] = useState({});

  const navigate = useNavigate();
  const dispatch = useAuthDispatch();

  const LoginUser = (data) => {
    axios.post('http://localhost:3000/users/loginUser', data)
      .then(response => {
        dispatch({ type: "LOGIN", payload: { token: response.data.token, user: response.data.user } });
        navigate('/');
      })
      .catch(err => {
        switch (err.response.data.type) {
          case "USER_AUTHENTICATION_ERROR":
            setError({ password: "Incorrect Password." });
            console.log(error)
            break;
          case "USER_NOT_FOUND":
            setError({ email: "Email ID Doesn't exist" });
            break;
          default:
            setError({ server: "Something wrong happen. Refresh and login again." });
        }
      })
  }

  const submitLoginForm = (e) => {
    e.preventDefault();
    LoginUser(variables)
  };

  return (
    <Container>
      <Card className="mt-5">
        <Card.Header className="text-center">
          <h1>Login</h1>
        </Card.Header>
        <Form onSubmit={submitLoginForm}>
          <Card.Body>
            <FloatingLabel label="Email address" className="mb-3">
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={variables.email}
                onChange={(e) =>
                  setVariables({ ...variables, email: e.target.value })
                } />
              {error.email ? (<p className="text-danger">{error.email}</p>) : null}
            </FloatingLabel>
            <FloatingLabel label="Password" className="mb-3">
              <Form.Control
                type="password"
                placeholder="Password"
                value={variables.password}
                onChange={(e) =>
                  setVariables({ ...variables, password: e.target.value })
                } />
              {error.password ? (<p className="text-danger">{error.password}</p>) : null}
            </FloatingLabel>
          </Card.Body>
          {error.server ? (<p className="text-danger">{error.server}</p>) : null}
          <Button className="m-3" variant="success" type="submit">Login</Button>
        </Form>
        <p className="text-center">New User? <a href="/register">Register Here</a></p>
      </Card>
    </Container>
  );
}
