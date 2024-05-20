import React from "react";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./CRUD.css";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { useEffect } from "react";
import { elements } from "chart.js";

export default function Update({ roomId }) {
  const [validated, setValidated] = useState(false);
  const [room, setRoom] = useState([]);
  const [clicked, setClicked] = useState(false);
  const [newImage, setNewImage] = useState("");
  const [newStatus, setNewStatus] = useState("");
  
  
  const [key,setKey]=useState(0);

  const [price, setPrice] = useState(0);
  useEffect(() => {
    axios
      .get(`http://localhost:8080/Rooms/get-room/id/${roomId}`)
      .then((res) => {
        setRoom(res.data);
        setNewImage(res.data.images)
        setKey(res.data.keyNum);
        setPrice(res.data.price);
       
      })
      .catch((err) => console.log({ message: err.message }));
  }, [roomId]);

 
  
  useEffect(()=>{
    console.log(newImage)
  },[newImage])
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      const formData = new FormData();
      formData.append("image", newImage);
      formData.append("key", key);
      formData.append("price",price);

      axios
        .patch(`http://localhost:8080/Rooms/update-room/patch/${roomId}`, formData, {
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
            <Form.Label controlId="image" htmlFor="image" >Image</Form.Label>
            <Form.Control type="text" id="image" placeholder="image"  value={newImage} required />
            <Form.Control.Feedback type="invalid" className="bold">
             Image
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
            <Form.Label controlId="key" htmlFor="key" >Key</Form.Label>
            <Form.Control type="number" id="key" placeholder="key"  value={key} onChange={(e)=>setKey(e.target.value)}required />
            <Form.Control.Feedback type="invalid" className="bold">
              key number
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group>
            <Form.Label controlId="Price" htmlFor="Price">Price</Form.Label>
            <Form.Control type="number" id="Price" placeholder="Price"  value={price} onChange={(e)=>setPrice(e.target.value)} required />
            <Form.Control.Feedback type="invalid" className="bold">
             Price
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
