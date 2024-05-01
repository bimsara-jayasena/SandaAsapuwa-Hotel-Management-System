import React from "react";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./CRUD.css";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { useEffect } from "react";
import axios from "axios";

export default function Delete({ roomId, mngId }) {
  const [validated, setValidated] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [password, setPassword] = useState("");
  const [isCorrect,setIsCorrect] = useState(true);
  useEffect(() => {
    axios
      .get(`http://localhost:8080/Employes/empid/${mngId}`)
      .then((res) => {
        setPassword(res.data.password);
      })
      .catch((err) => console.log({ message: err.message }));
  },[roomId]);
  
  const checkPw=(event)=>{
    setIsCorrect(event.target.value===password);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
     
      event.stopPropagation();
    }
    else if(!isCorrect){
      toast.error("Password is incorrect!")
    }
    else{
      axios.delete(`http://localhost:8080/Rooms/remove-room/${roomId}`)
      .then((res)=>{
        toast.success("Room removed successfully!")
      })
      .catch((err)=>{console.log(err)});
      console.log(roomId);
    }

    setValidated(true);
  };
  const update = () => {
    setClicked(!clicked);
  };
  return (
    /*  {clicked ? "crud-body display-none  " : "crud-body display-block  "} */
    <div className="crud-body crud-display-block  ">
      <h1>Remove a Room</h1>
      <h2>Enter the password to confirm deletion</h2>
      <div className="crud-body crud-display-block  ">
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label controlId="lblContactNo" />
            <Form.Control type="tp" placeholder="Password" onChange={(e)=>{checkPw(e)}} required />
            <Form.Control.Feedback type="invalid" className="bold">
              Enter your password
            </Form.Control.Feedback>
          </Form.Group>

          <Button type="submit" className="btnDelete">
            <div className="bold">Delete</div>
          </Button>
        </Form>
       
      </div>
    </div>
  );
}
