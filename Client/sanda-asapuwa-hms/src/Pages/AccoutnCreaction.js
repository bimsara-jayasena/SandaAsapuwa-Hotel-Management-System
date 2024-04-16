import React from "react";
import { useState } from "react";
import {Link} from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { FloatingLabel, Form, InputGroup } from "react-bootstrap";
import '../StyleSheets/CreateAcc.css';
import Col from 'react-bootstrap/Col';
export default function AccountCreate(){
    const [validated,setValidated]=useState(false);

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }
    
        setValidated(true);
      };
    return(
        <div>
           <section className="form-Body">
           <section className="image-panel">
               <h1 className="">Welcome to Sanda Asapuwa</h1>
               </section>
               <section className="form-panel">
                <h1>Create New Account</h1>
                <div className="form-container">
              
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Label controlId="floatingInput" label="user Id"/>
                        <Form.Control type="text" placeholder="Employe ID" required/>
                        <Form.Control.Feedback type="invalid" className="bold">Enter Correct Employee Id</Form.Control.Feedback>
                       
                    </Form.Group>

                    <Form.Group>
                        <Form.Label controlId="floatingInput" label="user First Name"/>
                        <Form.Control type="text" placeholder="First Name" required/>
                        <Form.Control.Feedback type="invalid" className="bold">Enter First name</Form.Control.Feedback>
                      
                    </Form.Group>

                    <Form.Group>
                        <Form.Label controlId="floatingInput" label="user Lat Name"/>
                        <Form.Control type="text" placeholder="Last Name" required/>
                        <Form.Control.Feedback type="invalid" className="bold">Enter Last name</Form.Control.Feedback>
                       
                    </Form.Group>

                    <Form.Group>
                        <Form.Label controlId="floatingInput" label="user First Name"/>
                        <InputGroup hasValidation>
                        <Form.Control type="email" placeholder="email" required/>
                        <InputGroup.Text className="bold">@Gmail.com</InputGroup.Text>
                        <Form.Control.Feedback type="invalid" className="bold">Enter e-mail address</Form.Control.Feedback>
                        
                        </InputGroup>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label controlId="floatingInput" label="user pw"/>
                        <Form.Control type="password" placeholder="Password" required/>
                        <Form.Control.Feedback type="invalid" className="bold">Enter Correct Password</Form.Control.Feedback>
                       
                    </Form.Group>
                    <Button type="submit" ><div className="bold">Create</div></Button>
                </Form>
               
                   
                </div>
               </section>
              

               
            </section>
               
        </div>
    )
}