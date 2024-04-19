import React from "react";
import { useState } from "react";
import './CRUD.css';
import {Form} from 'react-bootstrap';
import  Button  from "react-bootstrap/Button";

export default function Update({roomId}){
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
      const check=()=>{
        alert(roomId)
      }
    return(
       /*  {clicked ? "crud-body display-none  " : "crud-body display-block  "} */
        <div className= "crud-body crud-display-block  ">
          <h1>Update Room</h1>
           <div className= "crud-body crud-display-block  ">
          
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                   

                    <Form.Group>
                        <Form.Label controlId="floatingInput" label="room ID"/>
                        <Form.Control type="text" placeholder="Room ID" required/>
                        <Form.Control.Feedback type="invalid" className="bold">Room ID</Form.Control.Feedback>
                      
                    </Form.Group>

                    <Form.Group>
                        <Form.Label controlId="floatingInput" label="room price"/>
                        <Form.Control type="text" placeholder="Room Price" required/>
                        <Form.Control.Feedback type="invalid" className="bold">Room Price</Form.Control.Feedback>
                       
                    </Form.Group>

                    

                    <Form.Group>
                        <Form.Label controlId="lblContactNo"/>
                        <Form.Control type="tp" placeholder="Images" required/>
                        <Form.Control.Feedback type="invalid" className="bold">Add Images</Form.Control.Feedback>
                    </Form.Group>

                   
                    <Button type="submit" className="btnCreate" onClick={update}><div className="bold">Update</div></Button>
                </Form>
               
                <Button onClick={check}><div className="bold">Check</div></Button>
                </div>
        </div>
        
    )
}