import React, { useEffect } from "react";
import { useState } from "react";
import "./CRUD.css";
import { Form, InputGroup, Table } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Logo from "../Resources/icons8-lotus-64-white.png";
import axios from "axios";
import { faL } from "@fortawesome/free-solid-svg-icons";
export default function EmployeInfo({
  image,
  employeId,
  firstName,
  lastName,
  position,
  email,
  address,
  contactNo,
  password
}) {
  const [validated, setValidated] = useState(false);
  const [removed, setRemoved] = useState(false);
  
  const [newImage,setNewImage] =  useState(image);
  const [newfirstName, setNewFirstName] = useState(firstName);
  const [newlastName, setNewLastName] = useState(lastName);
  const [newposition, setNewPosition] = useState(position);
  const [newemail,setNewEmail] = useState(email);
  const [newAddress,setNewAddress] = useState(address);
  const [newContactNo,setNewContactNo] = useState(contactNo);
  const [newPassword,setNewPassword] = useState(password);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };
  const setFirstName=(event)=>{
    console.log(event.target.value);
  }

  const btnUpdateClicked = () => {
   const formData=new FormData();
   formData.append("profile-image",newImage)
   formData.append("firstName",newfirstName)
   formData.append("lastName",newlastName)
   formData.append("eMail",newemail)
   formData.append("address",newAddress)
   formData.append("contactNo",newContactNo);
   formData.append("password",newPassword);

  /*  axios.put(`http://localhost:8080/Employes/update-employe/${employeId}`,formData)
   .then((res)=>{
    console.log(`employe ${firstName}'s details updated!`)
   })
   .catch((err)=>console.log({message:err.message})); */
   console.log(
     newImage+"\n"+
     newfirstName+" "+newlastName+"\n"+
     newemail+"\n"+
     newAddress+"\n"+
     newContactNo+"\n"+
     newPassword
   )
  };

  return (
    <div
      className={
        !removed
          ? "crud-body crud-display-block  "
          : "crud-body crud-display-none  "
      }
    >
      <h1>Employe info</h1>
      <div className="logo">
        {" "}
        <img src={Logo} />
      </div>
      <div className="crud-form-container crud-display-block  ">
        <div>
          <img src="" alt="profile-image" />
         
          <Table className="custom" striped bordered hover variant="primary">
            <tbody>
              <tr>
                <th>Employee Id</th>
                <th>{employeId}</th>
              </tr>

              <tr>
                <th> First Name</th>
                <th >
                  {firstName}
                </th>
              </tr>
              <tr>
                <th> Last Name</th>
                <th > 
                  {lastName}
                </th>
              </tr>
              <tr>
                <th>position</th>
                <th >{position}</th>
              </tr>
              <tr>
                <th>Address</th>
                <th>{address}</th>
              </tr>
              <tr>
                <th>E-Mail </th>
                <th>{email}</th>
              </tr>
              <tr>
                <th>Contact No</th>
                <th>{contactNo}</th>
              </tr>
             {password==null ? <></> :  <tr>
                <th>password</th>
                <th>{password}</th>
              </tr>}
            </tbody>
          </Table>
        </div>
      </div>
    
    </div>
  );
}
