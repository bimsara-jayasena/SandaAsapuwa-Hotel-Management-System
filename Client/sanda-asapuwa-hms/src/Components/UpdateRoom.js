import React from "react";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./CRUD.css";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { useEffect } from "react";

export default function Update({ roomId }) {
  const [validated, setValidated] = useState(false);
  const [room,setRoom]=useState(null);
  const [clicked, setClicked] = useState(false);
  const [newImage, setNewImage] = useState("");
  const [newStatus, setNewStatus] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:8080/Rooms/get-room/${roomId}`)
      .then((res) => {
        setRoom(res.data);
        setNewImage(res.data.images);
        setNewStatus(res.data.availability);
      })
      .catch((err) => console.log({ message: err.message }));

      
  }, [roomId]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
     
      event.stopPropagation();
    } 
    else {
      const formData = new FormData();
      formData.append("image", newImage);
      formData.append("availability", newStatus);

      axios
        .put(`http://localhost:8080/Rooms/update-room/${roomId}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(() => {
          toast.success("room updated!");
        })
        .catch((err) => {
          console.log({ message: err.message });
        });
    }
    setValidated(true);
  };

  const update = () => {
    setClicked(!clicked);
  };
  const check = () => {
    alert(roomId);
  };
  return (
    /*  {clicked ? "crud-body display-none  " : "crud-body display-block  "} */
    <div className="crud-body crud-display-block  ">
      <h1>Update Room</h1>
      <div className="crud-body crud-display-block  ">
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          

          
         
              <Form.Group>
            <Form.Label controlId="lblContactNo" />
            <Form.Control type="text"  value={newImage} onChange={(e)=>{setNewImage(e.target.value)}} required />
            <Form.Control.Feedback type="invalid" className="bold">
              Add Images
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group>
            <Form.Label controlId="lblContactNo" />
            <Form.Control type="text"  value={newStatus} onChange={(e)=>{setNewStatus(e.target.value)}} required />
            <Form.Control.Feedback type="invalid" className="bold">
              Add status
            </Form.Control.Feedback>
          </Form.Group>
          

          <Button type="submit" className="btnCreate" onClick={update}>
            <div className="bold">Update</div>
          </Button>
        </Form>

        <Button onClick={check}>
          <div className="bold">Check</div>
        </Button>
      </div>
    </div>
  );
}
