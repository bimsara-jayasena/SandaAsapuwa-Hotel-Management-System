
import React, { useState } from "react";
import {Link} from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import {Form } from "react-bootstrap";
import '../StyleSheets/Home.css';
import Logo from '../Resources/sanda.jpg';
export default function Home(){
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
            <section className="Body">
                <div className="logo">
                    <img src={Logo}/>
                </div>
               <h1 className="color-white">Welcome to Sanda Asapuwa</h1>
                <div className="form-container">
              
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Label controlId="floatingInput" label="user Id"/>
                        <Form.Control type="text" placeholder="Employe ID" required/>
                        <Form.Control.Feedback type="invalid" className="bold">Enter Correct Employee Id</Form.Control.Feedback>
                      
                    </Form.Group>

                    <Form.Group>
                        <Form.Label controlId="floatingInput" label="user pw"/>
                        <Form.Control type="password" placeholder="Password" required/>
                        <Form.Control.Feedback type="invalid" className="bold">Enter Correct Password</Form.Control.Feedback>
                      
                    </Form.Group>
                    <Button type="submit">Log in</Button>
                </Form>
               
                   
                </div>
                
                <Button ><Link to='/New Account' className="link">Create new account</Link></Button>
               
            </section>

          
      
        </div>
    )
}