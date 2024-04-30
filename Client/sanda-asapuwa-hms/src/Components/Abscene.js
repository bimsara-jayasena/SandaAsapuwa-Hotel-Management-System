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
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }
    
        setValidated(true);
      };
      const addImage=(event)=>{
        setImages(event.target.files  [0]);
      }
      const addAvailability=(event)=>{
        setAvailability(event.target.value);
      }
      const Add=()=>{
            setClicked(!clicked);
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
    return(
      
        <div className="crud-body crud-display-block  ">
          <h1>Abscene employees</h1>
          <div className="logo"> <img src={Logo}/></div>
           <div className= "crud-form-container crud-display-block  ">
          
                <table>
                    <tr>
                        <th>name</th>
                    </tr>
                    <tr>
                        <td>dfd</td>
                    </tr>
                </table>
                   
                </div>
        </div>
        
    )
}
