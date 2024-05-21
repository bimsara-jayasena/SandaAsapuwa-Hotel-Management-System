import React from "react";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./CRUD.css";
import { Form, InputGroup, Alert } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Logo from "../Resources/icons8-lotus-64-white.png";
import axios from "axios";
export default function AddEmploye() {
  const [validated, setValidated] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [availability, setAvailability] = useState("");
  const [images, setImages] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mail, setMail] = useState("");
  const [address, setAddress] = useState("");
  const [position, setPosition] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [Password, setPassword] = useState("");
  const [fnameExist,setfnameExist]=useState(false);
  const [lnameExist,setlnameExist]=useState(false);
  const [emailExist,setEmailExist]=useState(false);
  const [isCreated,setCreated]=useState(false);
  const [show, setShow] = useState(true);
 
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false || (isNaN(contactNo))) {
     
      event.stopPropagation();
    }
    else{
        setCreated(true); 
        const formData=new FormData();
        formData.append("profile-image",images)
        formData.append("firstName",firstName)
        formData.append("lastName",lastName)
        formData.append("eMail",mail+"@gmail.com")
        formData.append("address",address)
        formData.append("contactNo",contactNo)
        formData.append("position",position)
        formData.append("password",Password)
        formData.append("availability",availability)

        axios.post('http://localhost:8080/Employes/add-employe',formData,{
            headers:{
                'Content-Type':'multipart/form-data'
              }
        })
        .then((res)=>{
            console.log("NEW DATA-->"+res.data.empId);
           
            setFirstName("");
            setLastName("");
            setMail("");
            setAddress("");
            setPosition("");
            setContactNo("");
            toast.success(`${res.data.firstName} is added as ${res.data.position} `);
        })
        .catch((err)=>{console.log({message:err.message})})
           
    }
   
    setValidated(true);
  };
  const addImage = (event) => {
    setImages(event.target.value);
  };

  const closeMessage=()=>{
    setCreated(false)
   }
   


  return (
    <div className="crud-body crud-display-block  height-">
      <h1>Add new Employee</h1>
      <div className="logo">
        {" "}
        <img src={Logo} />
      </div>
      <div className="crud-form-container crud-display-block  ">
        
        <section className="form-panel ">
         
          {fnameExist && lnameExist ? (
            <Alert variant="danger" onClose={() => setShow(false)} dismissible>
              <Alert.Heading>
                Oh snap! this User name already exist!
              </Alert.Heading>
            </Alert>
          ) : (
            <></>
          )}
          {emailExist ? (
            <Alert variant="danger" onClose={() => setShow(false)} dismissible>
              <Alert.Heading>
                Oh snap! this email address already exist!
              </Alert.Heading>
            </Alert>
          ) : (
            <></>
          )}
          <div className="form-container ">
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <div className="form-group"> 
              <Form.Group>
                <Form.Label htmlFor="profile" />
                <Form.Control
                  type="text"
                  id="profile"
                  onChange={(e)=>{addImage(e)}} 
                  required
                />
                <Form.Control.Feedback type="invalid" className="bold">
                 
                </Form.Control.Feedback>
              </Form.Group>
             
              <Form.Group>
                <Form.Label htmlFor="firstName" />
                <Form.Control
                  type="text"
                  id="firstName"
                  onChange={(e)=>{setFirstName(e.target.value)}}
                  placeholder="First Name"
                  required
                />
                <Form.Control.Feedback type="invalid" className="bold">
                 
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group>
                <Form.Label htmlFor="lastName" />
                <Form.Control
                  type="text"
                  id="lastName"
                  onChange={(e)=>{setLastName(e.target.value)}}
                  placeholder="Last Name"
                  required
                />
                <Form.Control.Feedback type="invalid" className="bold">
                 
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group>
                <Form.Label htmlFor="mail" />
                <InputGroup hasValidation>
                  <Form.Control
                    type="text"
                    id="mail"
                    placeholder="email"
                    onChange={(e)=>{setMail(e.target.value)}}
                    required
                  />
                  <InputGroup.Text className="bold">@Gmail.com</InputGroup.Text>
                  <Form.Control.Feedback type="invalid" className="bold">
                   
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
              </div>

              <div className="form-group">
              <Form.Group>
                <Form.Label htmlFor="contact" />
                <Form.Control
                  type="tp"
                  id="contact"
                  onChange={(e)=>{setContactNo(e.target.value)}} 
                  placeholder="Contact No"
                  required
                />
                <Form.Control.Feedback type="invalid" className="bold">
                 
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group>
                <Form.Label htmlFor="address" />
                <Form.Control
                  type="text"
                  id="address"
                  onChange={(e)=>{setAddress(e.target.value)}}
                  placeholder="Address"
                  required
                />
                <Form.Control.Feedback type="invalid" className="bold">
                 
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group>
                <Form.Label htmlFor="position" />
                <Form.Control
                  type="text"
                  id="position"
                  onChange={(e)=>{setPosition(e.target.value)}}
                  placeholder="position"
                  required
                />
                <Form.Control.Feedback type="invalid" className="bold">
                  
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group>
                <Form.Label htmlFor="pw" />
                <Form.Control
                  type="password"
                  id="pw"
                  onChange={(e)=>{setPassword(e.target.value)}} 
                  placeholder="password"
                  required
                />
                <Form.Control.Feedback type="invalid" className="bold">
                  
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group>
                <Form.Label htmlFor="pw" />
                <Form.Control
                  type="text"
                  id="availability"
                  onChange={(e)=>{setAvailability(e.target.value)}} 
                  placeholder="Availability"
                  required
                />
                <Form.Control.Feedback type="invalid" className="bold">
                  
                </Form.Control.Feedback>
              </Form.Group>
              </div>
              <Button type="submit" className="btnCreate" >
                <div className="bold">Create</div>
              </Button>
            </Form>
           
          </div>
        </section>
      </div>
    </div>
  );
}
{
  /*  <Form.Group>
                    <Form.Label controlId="floatingInput" label="room price"/>
                    <InputGroup hasValidation>
                        <InputGroup.Text className="bold">LKR</InputGroup.Text>
                        <Form.Control type="text" placeholder="Room Price" required/>   
                        
                        <Form.Control.Feedback type="invalid" className="bold">Room Price</Form.Control.Feedback>
                        
                        </InputGroup>
                       
                       
                        
                       
                    </Form.Group> */
}
