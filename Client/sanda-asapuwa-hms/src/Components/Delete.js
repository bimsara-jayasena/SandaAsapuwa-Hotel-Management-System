import React from "react";
import { useState } from "react";
import './CRUD.css';
import {Form} from 'react-bootstrap';
import  Button  from "react-bootstrap/Button";

export default function Delete({roomId}){
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
       /*  {clicked ? "crud-body display-none  " : "crud-body display-block  "} */
        <div className= "crud-body crud-display-block  ">
          <h1>Remove a Room</h1>
           <div className= "crud-body crud-display-block  ">
          
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                   

                    <Form.Group>
                        <Form.Label controlId="lblContactNo"/>
                        <Form.Control type="tp" placeholder="Password" required/>
                        <Form.Control.Feedback type="invalid" className="bold">Enter your password</Form.Control.Feedback>
                    </Form.Group>

                   
                    <Button type="submit" className="btnDelete"><div className="bold">Delete</div></Button>
                </Form>
                <Button className="btn-Delete" onClick={()=>{alert(roomId)}}><div className="bold">Delete</div></Button>
                   
                </div>
        </div>
        
    )
}