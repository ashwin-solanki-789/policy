import React, { useState } from "react";
import { Container, Button } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { Form } from "react-bootstrap";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import InputGroup from "react-bootstrap/InputGroup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const COUNTRY_CODE = ["+91", "+1", "+44", "+52", "+86"]

export default function Register() {

  const [variables, setVariables] = useState({
    name: "",
    dob: "",
    email: "",
    mobile: "",
    country_code: "91",
    password: "",
    confirm_password: ""
  });

  const navigate = useNavigate();

  const [error, setError] = useState({});

  const submitHandel = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3000/users/regsiterUser', variables)
      .then(response => {
        navigate("/login")
      })
      .catch(err => {
        // console.log(err)
        setError(err.response.data);
        // switch (err.response.data.type) {
        //   case "USER_AUTHENTICATION_ERROR":
        //     setError({ password: "Incorrect Password." });
        //     console.log(error)
        //     break;
        //   case "USER_NOT_FOUND":
        //     setError({ email: "Email ID Doesn't exist" });
        //     break;
        //   default:
        //     setError({ server: "Something wrong happen. Refresh and login again." });
        // }
      })
  }
  console.log(error.length)
  return (
    <Container>
      <Card className="mt-5">
        <Card.Header className="text-center">
          <h1>Register</h1>
        </Card.Header>
        <Form onSubmit={submitHandel}>
          <Card.Body>
            <FloatingLabel label="Full Name" className="mb-3">
              <Form.Control type="text" placeholder="Full Name" value={variables.name} onChange={(e) => setVariables({ ...variables, name: e.target.value })} />
            </FloatingLabel>

            <FloatingLabel label="Email address" className="mb-3">
              <Form.Control type="email" placeholder="Enter email" value={variables.email} onChange={(e) => setVariables({ ...variables, email: e.target.value })} />
            </FloatingLabel>

            <InputGroup className="mb-3">
              <Form.Select style={{ maxWidth: "8%" }} defaultValue={"91"} onChange={(e) => setVariables({ ...variables, country_code: e.target.value })}>
                {COUNTRY_CODE.map((e, i) => (<option key={i} value={e}>{e}</option>))}
              </Form.Select>
              <FloatingLabel label="Mobile Numebr">
                <Form.Control type="text" placeholder="Mobile Number" value={variables.mobile} onChange={(e) => setVariables({ ...variables, mobile: e.target.value })} />
              </FloatingLabel>
            </InputGroup>

            <FloatingLabel label="D.O.B" className="mb-3">
              <Form.Control type="date" placeholder="D.O.B" value={variables.dob} onChange={(e) => setVariables({ ...variables, dob: e.target.value })} />
            </FloatingLabel>

            <FloatingLabel label="Password" className="mb-3">
              <Form.Control type="password" placeholder="Password" value={variables.password} onChange={(e) => setVariables({ ...variables, password: e.target.value })} />
            </FloatingLabel>

            <FloatingLabel label="Confirm Password" className="mb-3">
              <Form.Control type="password" placeholder="Confirm Password" value={variables.confirm_password} onChange={(e) => setVariables({ ...variables, confirm_password: e.target.value })} />
            </FloatingLabel>
          </Card.Body>
          <Button className="m-3" variant="success" type="submit">
            Register
          </Button>
        </Form>
        {error.length > 0 && (
          <div className="text-danger mx-auto">
            <ul className="list">
              {error.map((value) => {
                var msg = Object.entries(value)[0][1]
                var key = Object.entries(value)[0][0]
                return <li key={key}>{msg}</li>
              }
              )}
            </ul>
          </div>
        )}
        <p className="text-center">
          Already Register? <a href="/login">Login!</a>
        </p>
      </Card>
    </Container >
  );
}
