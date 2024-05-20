import React from "react";
import { useState } from "react";
import './CRUD.css';
import {toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {Form,InputGroup} from 'react-bootstrap';
import  Button  from "react-bootstrap/Button";
import Logo from '../Resources/icons8-lotus-64-white.png';
import axios from "axios";
import { format } from "date-fns";
import { useEffect } from "react";
export default function AddRoom(){
    const [validated,setValidated]=useState(false);
    const [clicked,setClicked]=useState(false);
    const [availability,setAvailability]=useState("");
    const [images,setImages]=useState("");
    const [catagory,setCatagory]=useState("");
    const [keyNum,setKeyNum]=useState(0);
    const [price,setPrice]=useState(0);

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
          event.stopPropagation();
        }
        else{
          const formData=new FormData();
          formData.append('image',images);
          formData.append('availability',availability);
          formData.append('Key',keyNum);
          formData.append('catagory',catagory);
          formData.append('price',price);

          axios.post("http://localhost:8080/Rooms/add-room",formData,{
            headers:{
              'Content-Type':'multipart/form-data'
            }
          })
          .then(()=>{toast.success("new room added!")})
          .catch((err)=>{console.log({message:err.message})});
        
        }
    
        setValidated(true);
      };
      const addImage=(event)=>{
        setImages(event.target.value);
      }
      const addAvailability=(event)=>{
        setAvailability(event.target.value);
      }
      const Add=()=>{
            setClicked(!clicked);
           
      }
      useEffect(()=>{
        console.log('Room Information,',availability+'\n'+keyNum+'\n'+catagory+'\n'+price+'\n'+images)
      },[availability,keyNum,catagory,price,images])
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
                        <Form.Label controlId="key" htmlFor="key"/>
                        <Form.Control type="number" id="key" placeholder="key" onChange={(e)=>{setKeyNum(e.target.value)}}required/>
                        <Form.Control.Feedback type="invalid" className="bold">Add key number</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label controlId="catagory" htmlFor="catagory"/>
                        <Form.Control type="text" id="catagory" placeholder="catagory" onChange={(e)=>{setCatagory(e.target.value)}}required/>
                        <Form.Control.Feedback type="invalid" className="bold">select catagory</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label controlId="Price" htmlFor="Price"/>
                        <Form.Control type="text" id="Price" placeholder="Price" onChange={(e)=>{setPrice(e.target.value)}}required/>
                        <Form.Control.Feedback type="invalid" className="bold">Add Price</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label controlId="images" htmlFor="images"/>
                        <Form.Control type="text" id="images" placeholder="Images" onChange={(e)=>{addImage(e)}}required/>
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