import React from "react";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./CRUD.css";
import { Form, InputGroup, Alert } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Logo from "../Resources/icons8-lotus-64-white.png";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
/*  */

export default function AddBooking({ empId }) {
  const { id } = useParams();
  const [validated, setValidated] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [availability, setAvailability] = useState("");
  const [images, setImages] = useState("");
  const [rooms, setRooms] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [guestCount, setGuestCount] = useState(0);
  const [departure, setDeparture] = useState();
  const [arrival, setArrival] = useState();
  const [payment, setPayment] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("");

  const [fnameExist, setfnameExist] = useState(false);
  const [lnameExist, setlnameExist] = useState(false);
  const [emailExist, setEmailExist] = useState(false);
  const [isCreated, setCreated] = useState(false);
  const [show, setShow] = useState(true);
  const [roomCount, setRoomCount] = useState(1); // Initial room count
  const [roomValues, setRoomValues] = useState(
    Array.from({ length: roomCount }, () => "")
  ); // Array to hold values of each room

  // Function to handle changes in input fields for a specific room
  const handleRoomChange = (index, value) => {
    const newRoomValues = [...roomValues];
    newRoomValues[index] = value;
    setRoomValues(newRoomValues);
  };

  // Function to add a new room
  const addRoom = () => {
    setRoomCount(roomCount + 1);
    setRoomValues([...roomValues, ""]);
  };
  // Remove room
  const removeRoom = (index) => {
    const newRoomValues = [...roomValues];
    newRoomValues.splice(index, 1);
    setRoomValues(newRoomValues);
    setRoomCount(roomCount - 1);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      setCreated(true);
      const formData = new FormData();
      formData.append("room",rooms)
      formData.append("firstName", firstName);
      formData.append("lastName", lastName);
      formData.append("guestCount",guestCount);
      formData.append("arrival",arrival);
      formData.append("depDate",departure);
      //add new booking
      //update rooms/room status to 'booked' 
    }

    setValidated(true);
  };
  const addImage = (event) => {
    setImages(event.target.value);
  };

  const closeMessage = () => {
    setCreated(false);
  };

  return (
    <div className="crud-body crud-display-block  " style={{width:"100vw"}}>
      <h1>Add new Booking</h1>
      <div className="logo">
        {" "}
        <img src={Logo} />
      </div>
      <div className="crud-form-container crud-display-block " style={{width:'100vw'}}>
        <section className="form-panel ">
         
          <div className="form-container ">
            <Form noValidate validated={validated} onSubmit={handleSubmit} >
              <div className="form-body">
                <div className="room-info ">
                  Room Information
                  {/* Render form groups based on roomCount */}
                  {Array.from({ length: roomCount }, (_, index) => (
                    <div className="rooms">
                      <Form.Group key={index}>
                        <Form.Label  >Room Catagory</Form.Label>
                        <Form.Control
                          type="text"
                          id={`roomCatagory${index}`}
                          value={roomValues[index]}
                          onChange={(e) =>
                            handleRoomChange(index, e.target.value)
                          }
                          placeholder="Room Catagory"
                          required
                          style={{width:"20rem"}}
                        />
                        <Form.Control.Feedback
                          type="invalid"
                          className="bold"
                        />
                      </Form.Group>

                      {index === 0 ? (
                        <></>
                      ) : (
                        <Button
                          variant="danger"
                          onClick={() => removeRoom(index)}
                        >
                          Remove
                        </Button>
                      )}
                    </div>
                  ))}
                  {/* Button to add a new room */}
                  <Button className="btnAddRoom" onClick={addRoom}>
                    {" "}
                    Add
                  </Button>
                </div>

                <div className="guest-info">
                  Guest information
                  {/* First Name */}
                  <Form.Group>
                    <Form.Label htmlFor="firstName" />
                    <Form.Control
                      type="text"
                      id="firstName"
                      onChange={(e) => {
                        setFirstName(e.target.value);
                      }}
                      placeholder="First Name"
                      required
                       style={{width:"20rem"}}
                    />
                    <Form.Control.Feedback
                      type="invalid"
                      className="bold"
                    ></Form.Control.Feedback>
                  </Form.Group>
                  {/* Last Name */}
                  <Form.Group>
                    <Form.Label htmlFor="lastname" />
                    <Form.Control
                      type="text"
                      id="lastName"
                      onChange={(e) => {
                        setLastName(e.target.value);
                      }}
                      placeholder="Last Name"
                      required
                       style={{width:"20rem"}}
                    />
                    <Form.Control.Feedback
                      type="invalid"
                      className="bold"
                    ></Form.Control.Feedback>
                  </Form.Group>
                  {/* Guest count */}
                  <Form.Group>
                    <Form.Label htmlFor="guestCount" />
                    <Form.Control
                      type="Number"
                      id="guestCount"
                      onChange={(e) => {
                        setGuestCount(e.target.value);
                      }}
                      placeholder="Guest Count"
                      required
                       style={{width:"20rem"}}
                    />
                    <Form.Control.Feedback
                      type="invalid"
                      className="bold"
                    ></Form.Control.Feedback>
                  </Form.Group>
                  {/* Departure Date */}
                  <Form.Group>
                    <Form.Label htmlFor="depDate" />
                    <Form.Control
                      type="date"
                      id="depDate"
                      onChange={(e) => {
                        setDeparture(e.target.value);
                      }}
                      placeholder="Departure Date"
                      required
                       style={{width:"20rem"}}
                    />
                    <Form.Control.Feedback
                      type="invalid"
                      className="bold"
                    ></Form.Control.Feedback>
                  </Form.Group>
                </div>
              </div>
              <Button
                type="submit"
                className="btnCreate"
                onClick={() => {
                  setClicked(true);
                }}
              >
                <div className="bold">Create</div>
              </Button>
            </Form>
          </div>
        </section>
      </div>
      <div
        className={
          clicked ? "crud-alert-container zindex-on" : "crud-alert-container "
        }
      >
        <div
          className={
            clicked ? "crud-alert display-block" : "crud-alert display-none"
          }
        >
          <div className="btn-close-container">
            <button
              className="close-button"
              onClick={() => {
                setClicked(false);
              }}
            >
              Close
            </button>
          </div>
          <div className="alert-container">
            Keys
           
            <Form.Group>
              
                <Form.Label htmlFor="payment">Total payment</Form.Label>
                <Form.Control
                  type="number"
                  id="payment"
                  onChange={(e) => setPayment(e.target.value)}
                  placeholder="Room Catagory"
                  required
                />
             
              <Form.Control.Feedback type="invalid" className="bold" />
            </Form.Group>
           
              
                <Form.Group  controlId="paymentMethode">
                  
                  <Form.Label style={{width:'20rem'}}>Payment Methode</Form.Label>
                  <Form.Select defaultValue="Choose...">
                    <option>Card</option>
                    <option>Cash</option>
                  </Form.Select>
                  
                </Form.Group>
             
                <Link to={`/Reception/${id}`}>
              <Button>Ok</Button>
            </Link>
           
          </div>
        </div>
      </div>
    </div>
  );
}
