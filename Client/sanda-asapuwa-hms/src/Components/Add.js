import React from "react";
import { useState } from "react";
import './CRUD.css';
import {Form,InputGroup} from 'react-bootstrap';
import  Button  from "react-bootstrap/Button";
import Logo from '../Resources/icons8-lotus-64-white.png'
export default function MngSide(){
    const [validated,setValidated]=useState(false);
    const [clicked,setClicked]=useState(false);
    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }
    
        setValidated(true);
      };
      const update=()=>{
            setClicked(!clicked);
          
      }
    return(
      
        <div className="crud-body crud-display-block  ">
          <h1>Add new Room</h1>
          <div className="logo"> <img src={Logo}/></div>
           <div className= "crud-form-container crud-display-block  ">
          
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                   

                    <Form.Group>
                        <Form.Label controlId="floatingInput" label="room ID"/>
                        <Form.Control type="text" placeholder="Room ID" required/>
                        <Form.Control.Feedback type="invalid" className="bold">Room ID</Form.Control.Feedback>
                      
                    </Form.Group>

                    <Form.Group>
                    <Form.Label controlId="floatingInput" label="room price"/>
                    <InputGroup hasValidation>
                        <InputGroup.Text className="bold">LKR</InputGroup.Text>
                        <Form.Control type="text" placeholder="Room Price" required/>   
                        
                        <Form.Control.Feedback type="invalid" className="bold">Room Price</Form.Control.Feedback>
                        
                        </InputGroup>
                       
                       
                        
                       
                    </Form.Group>

                    

                    <Form.Group>
                        <Form.Label controlId="lblContactNo"/>
                        <Form.Control type="file" placeholder="Images" required/>
                        <Form.Control.Feedback type="invalid" className="bold">Add Images</Form.Control.Feedback>
                    </Form.Group>

                   
                    <Button type="submit" className="btnCreate" onClick={update}><div className="bold">Update</div></Button>
                </Form>
               
                   
                </div>
        </div>
        
    )
}