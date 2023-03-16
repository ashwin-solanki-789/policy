import React, { useState } from 'react'
import { Alert, Form } from "react-bootstrap";
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { Container, Button } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';

export default function Policy({ setPolicy, policyValue }) {
  const navigate = useNavigate();

  const [errors, setErrors] = useState({});
  const [showAlert, setShowAlert] = useState(false);

  const todaysDate = new Date();

  const setPolicyData = () => {
    console.log('working....')
    // Input Validation
    var isError = false;
    for (const key in policyValue) {
      if (!isNaN(policyValue[key]) && parseFloat(policyValue[key]) <= 0) {
        isError = true;
        console.log(key)
        break;
      }
      if (policyValue[key] === "") {
        isError = true;
        console.log(key)
        break;
      }
    }
    for (const errorKey in errors) {
      if (errors[errorKey]) {
        isError = true;
        console.log(errorKey)
        break;
      }
    }
    if (isError) {
      // Throw Alert
      setShowAlert(true);
      console.log('errorrrrrrrr')
    } else {
      console.log(policyValue);
      navigate("/Illustration")
    }
  }

  return (
    <Container>
      <p className='display-3 text-center'>Policy Calculation</p>
      <FloatingLabel label="Date of Birth" className="mb-3">
        <Form.Control
          type="date"
          placeholder="Date of Birth"
          value={policyValue.dob}
          max={todaysDate.toISOString().split('T')[0]}
          onChange={(e) => {
            var selectedDate = new Date(e.target.value);
            var date_diff = Date.now() - selectedDate.getTime();
            var age_dt = new Date(date_diff);
            var age = Math.abs(age_dt.getUTCFullYear() - 1970);
            if (age >= 23 && age <= 56) {
              // setPolicyParameter({ ...policyParameter, dob: e.target.value })
              setPolicy({ ...policyValue, dob: e.target.value })
              setErrors({ ...errors, dob: false })
            } else {
              setErrors({ ...errors, dob: true })
            }
          }
          } />
        {errors.dob ? (<p className='text-danger p-1'>Age should be in between 23 - 56 years.</p>) : null}
      </FloatingLabel>
      <FloatingLabel label="Gender" className="mb-3">
        <Form.Select defaultValue={() => policyValue.gender !== "" ? policyValue.gender : ""} onChange={(e) => {
          setPolicy({ ...policyValue, gender: e.target.value })
          // setPolicyParameter({ ...policyParameter, gender: e.target.value })
        }}>
          <option value="" disabled>Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Others">Others</option>
        </Form.Select>
      </FloatingLabel>
      <FloatingLabel label="Sum Assured" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Sum Assured..."
          value={policyValue.sum_assured}
          onChange={(e) => {
            if (!isNaN(e.target.value)) {
              var val = parseFloat(e.target.value)
              setPolicy({ ...policyValue, sum_assured: e.target.value })
              // setPolicyParameter({ ...policyParameter, sum_assured: e.target.value })
              if (val * 10 <= 5000000) {
                setErrors({ ...errors, sum_assured: false })
              } else {
                setErrors({ ...errors, sum_assured: true })
              }
            }
          }
          } />
        {errors.sum_assured ? (<p className='text-danger p-1'>Minimum of Sum assured * 10 or 5000000 will be consider.</p>) : null}
      </FloatingLabel>
      <FloatingLabel label="Modal Premium" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Modal Premium"
          value={policyValue.premium}
          onChange={(e) => {
            var val = parseFloat(e.target.value)
            setPolicy({ ...policyValue, premium: e.target.value })
            // setPolicyParameter({ ...policyParameter, premium: e.target.value })
            if (val >= 10000 && val <= 50000) {
              setErrors({ ...errors, premium: false })
            } else {
              setErrors({ ...errors, premium: true })
            }
          }
          } />
        {errors.premium ? (<p className='text-danger p-1'>Premium should be in range 10000 - 50000.</p>) : null}
      </FloatingLabel>
      <FloatingLabel label="Premium Frequency" className="mb-3">
        <Form.Select defaultValue={() => policyValue.premuim_frequency !== "" ? policyValue.premuim_frequency : ""} onChange={(e) => {
          setPolicy({ ...policyValue, premuim_frequency: e.target.value })
        }}>
          <option value="" disabled>Select Premium</option>
          <option value="Yearly">Yearly</option>
          <option value="Half-Yearly">Half-Yearly</option>
          <option value="Monthly">Monthly</option>
        </Form.Select>
      </FloatingLabel>
      <FloatingLabel label="PT" className="mb-3">
        <Form.Control
          type="text"
          placeholder="PT"
          value={policyValue.pt}
          onChange={(e) => {
            var val = parseFloat(e.target.value)
            setPolicy({ ...policyValue, pt: e.target.value })
            // setPolicyParameter({ ...policyParameter, pt: e.target.value })
            if (val >= 10 && val <= 20) {
              setErrors({ ...errors, pt: false })
            } else {
              setErrors({ ...errors, pt: true })
            }
          }
          } />
        {errors.pt ? (<p className='text-danger p-1'>PT should be in between 10 - 20.</p>) : null}
      </FloatingLabel>
      <FloatingLabel label="PPT" className="mb-3">
        <Form.Control
          type="text"
          placeholder="PPT"
          value={policyValue.ppt}
          onChange={(e) => {
            const val = parseFloat(e.target.value)
            setPolicy({ ...policyValue, ppt: e.target.value })
            // setPolicyParameter({ ...policyParameter, ppt: e.target.value })
            if (val >= 5 && val <= 10 && policyValue.pt > val) {
              setErrors({ ...errors, ppt: false })
            } else {
              setErrors({ ...errors, ppt: true })
            }
          }
          } />
        {errors.ppt ? (<p className='text-danger p-1'>PPT should be in between 5 - 10 and PT should be greater than PPT.</p>) : null}
      </FloatingLabel>
      <Button className="m-3" variant="success" onClick={() => setPolicyData()}>Calculate</Button>
      {showAlert && (<Alert variant='danger'>Fill out all details. Missing values found!!</Alert>)}
    </Container>
  )
}
