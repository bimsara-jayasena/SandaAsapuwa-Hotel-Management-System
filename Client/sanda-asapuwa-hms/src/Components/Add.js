import React from "react";
import { useState } from "react";
import './CRUD.css';
import {Form,InputGroup} from 'react-bootstrap';
import  Button  from "react-bootstrap/Button";
import Logo from '../Resources/icons8-lotus-64-white.png';
import axios from "axios";
export default function MngSide(){
    const [validated,setValidated]=useState(false);
    const [clicked,setClicked]=useState(false);
    const [availability,setAvailability]=useState("");
    const [images,setImages]=useState([]);
    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
          event.stopPropagation();
        }
        else{
          const formData=new FormData();
          formData.append('availability',availability);
          formData.append('image',images);

          axios.post("http://localhost:8080/Rooms/add-Room",formData,{
            headers:{
              'Content-Type':'multipart/form-data'
            }
          })
          .then(()=>{console.log({message:'room added'})})
          .catch((err)=>{console.log({message:err.message})});
        
        }
    
        setValidated(true);
      };
      const addImage=(event)=>{
        setImages(event.target.files[0]);
      }
      const addAvailability=(event)=>{
        setAvailability(event.target.value);
      }
      const Add=()=>{
            setClicked(!clicked);
           
      }
    return(
      
        <div className="crud-body crud-display-block  ">
          <h1>Add new Room</h1>
          <div className="logo"> <img src={Logo}/></div>
           <div className= "crud-form-container crud-display-block  ">
          
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                   

                    <Form.Group>
                        <Form.Label controlId="available" htmlFor="availble"/>
                        <Form.Control type="text" id="availble" placeholder="Room availability" onChange={(e)=>{addAvailability(e)}} required/>
                        <Form.Control.Feedback type="invalid" className="bold">Room availability</Form.Control.Feedback>
                      
                    </Form.Group>

                    <Form.Group>
                        <Form.Label controlId="images" htmlFor="images"/>
                        <Form.Control type="file" id="images" placeholder="Images" onChange={(e)=>{addImage(e)}}required/>
                        <Form.Control.Feedback type="invalid" className="bold">Add Images</Form.Control.Feedback>
                    </Form.Group>

                   
                    <Button type="submit" className="btnCreate" onClick={Add}><div className="bold">Add</div></Button>
                </Form>
               
                   
                </div>
        </div>
        
    )
}
 {/*  <Form.Group>
                    <Form.Label controlId="floatingInput" label="room price"/>
                    <InputGroup hasValidation>
                        <InputGroup.Text className="bold">LKR</InputGroup.Text>
                        <Form.Control type="text" placeholder="Room Price" required/>   
                        
                        <Form.Control.Feedback type="invalid" className="bold">Room Price</Form.Control.Feedback>
                        
                        </InputGroup>
                       
                       
                        
                       
                    </Form.Group> */}