import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./CRUD.css";
import { Form, InputGroup, Alert } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Logo from "../Resources/icons8-lotus-64-white.png";
import axios from "axios";
import {
  Link,
  redirect,
  useParams,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { elements } from "chart.js";
import { format, parseISO } from "date-fns";

/*  */

export default function AddBooking({ empId }) {
  const { id } = useParams();
  const [validated, setValidated] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [availability, setAvailability] = useState("");
  const [images, setImages] = useState("");
  const [rooms, setRooms] = useState([]);
  const [keys, setKeys] = useState([]);
  const [singleKey, setSingleKey] = useState([]);
  const [doubleKey, setDoubleKey] = useState([]);
  const [catagory, setCatagory] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [guestCount, setGuestCount] = useState(0);
  const [departure, setDeparture] = useState();
  const [arrival, setArrival] = useState();
  const [singleRoomCost, setSingleRoomCost] = useState(0);
  const [doubleRoomCost, setDoubleRoomCost] = useState(0);
  const [payment, setPayment] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("Card");
  const [singleRoomCountExceeded, setSingleRoomCountExceeded] = useState(false);
  const [doubleRoomCountExceeded, setDoubleRoomCountExceeded] = useState(false);
  const [isCreated, setCreated] = useState(false);
  const [show, setShow] = useState(true);
  const [roomCount, setRoomCount] = useState(1); // Initial room count
  const [singleRoomCount, setSingleRoomCount] = useState(0);
  const [doubleRoomCount, setDoubleRoomCount] = useState(0);
  const [difference, setDifference] = useState(null);
  const [paymentOk, setPaymentOk] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const Navigate = useNavigate();
  const [availableSingleRoomCount, setAvailableSingleRoomCount] = useState(0);
  const [availableDoubleRoomCount, setAvailableDoubleRoomCount] = useState(0);
  const [roomValues, setRoomValues] = useState(
    Array.from({ length: roomCount }, () => "")
  ); // Array to hold values of each room

  useEffect(() => {
    let sc = 0;
    let dc = 0;
    axios
      .get("http://localhost:8080/Rooms/get-room/cat/single")
      .then((res) => {
        const asrc = res.data.filter(
          (element) => element.availability === "available"
        );

        setAvailableSingleRoomCount(asrc.length);
      })
      .catch((err) => console.log(err));

    axios
      .get("http://localhost:8080/Rooms/get-room/cat/double")
      .then((res) => {
        const adrc = res.data.filter(
          (element) => element.availability === "available"
        );
        setAvailableDoubleRoomCount(adrc.length);
      })
      .catch((err) => console.log(err));
  }, []);

  // Function to handle changes in input fields for a specific room
  const handleRoomChange = (index, value) => {
    const newRoomValues = [...roomValues];
    newRoomValues[index] = value;
    console.log("available single room count:", availableSingleRoomCount);
    console.log("available double room count:", availableDoubleRoomCount);
    const src = newRoomValues.filter((element) => element === "single");
    const drc = newRoomValues.filter((element) => element === "double");
    if (value === "single" && src.length > availableSingleRoomCount) {
      toast.error("No More single rooms available");
    } else if (value === "double" && drc.length > availableDoubleRoomCount) {
      toast.error("No More double rooms available");
    } else {
      setRoomValues(newRoomValues);
    }
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

  /* Get today date */
  useEffect(() => {
    const timeToMidnight = () => {
      const now = new Date();
      const midnight = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() + 1,
        0,
        0,
        0
      );
      return midnight.getTime() - now.getTime();
    };

    const timeoutId = setTimeout(() => {
      setCurrentDate(new Date()); // Updates the currentDate at midnight
    }, timeToMidnight());

    return () => clearTimeout(timeoutId);
  }, [currentDate]);

  /* get selected rooms */
  useEffect(() => {
    /* get selected rooms */
    const src = roomValues.filter((element) => element === "single");
    const drc = roomValues.filter((element) => element === "double");

    const cat = [];
    const singleKeys =[];
    const doubleKeys = [];

    /* get keys of selected rooms */

   
   console.log(singleKey);
    if (src.length != 0) {
    
      axios
        .get("http://localhost:8080/Rooms/get-room/cat/single")
        .then((res) => {
           
            const availableRooms=res.data.filter(element=>element.availability==='available');
           
            const availableKey=availableRooms.map(element=>element.keyNum);
            
          for (let index = 0; index < src.length; index++) {
           singleKeys.push(availableKey[index]);
           setSingleKey(singleKeys);
            
          }
           
        })
        .catch((err) => console.log(err));
    }

    if (drc.length != 0) {
    
      axios
        .get("http://localhost:8080/Rooms/get-room/cat/double")
        .then((res) => {
          const availableRooms=res.data.filter(element=>element.availability==='available');
          
          const availableKey=availableRooms.map(element=>element.keyNum);
         
          
          for (let index = 0; index < drc.length; index++) {
           doubleKeys.push(availableKey[index]);
            setDoubleKey(doubleKeys);
          }
          
        })
        .catch((err) => console.log(err));
    }

    /* get catagory of selected rooms */
      setCatagory(src.concat(drc))

   

    /* if (src != 0) {
      axios
        .get("http://localhost:8080/Rooms/get-room/cat/single")
        .then((res) => {
          res.data.forEach((element)=>{
            if(element.availability==="available"){
              const k = element.keyNum;
              setSingleKey(k);
             
            }
            
          })
        })
        .catch((err) => console.log(err));

      for (let index = 0; index < src.length; index++) {
        cat.push("single");
      }
    }
    if (drc != 0) {
      axios
        .get("http://localhost:8080/Rooms/get-room/cat/double")
        .then((res) => {
          res.data.forEach((element)=>{
            if(element.availability==="available"){
              const k = element.keyNum;
              setDoubleKey(k);
            }
            
          })
        })
        .catch((err) => console.log(err));
      for (let index = 0; index < drc.length; index++) {
        cat.push("double");
      }
    }
    console.log(doubleKey)
    setCatagory(cat); */
   
  }, [roomValues]);


  useEffect(()=>{
  
   const keys=[];
   setKeys(singleKey.concat(doubleKey))

  },[singleKey,doubleKey])

  /* Get keys of selected rooms */
  /* useEffect(() => {

    const src = roomValues.filter((element) => element === "single");
    const drc = roomValues.filter((element) => element === "double");
    console.log("length:",src.length)
    const key = [];

    axios
      .get("http://localhost:8080/Rooms/get-room/cat/single")
      .then((res) => {
        res.data.forEach((element) => {
          setSingleRoomCost(element.price);
        });
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get("http://localhost:8080/Rooms/get-room/cat/double")
      .then((res) => {
        res.data.forEach((element) => {
          setDoubleRoomCost(element.price);
        });
      })
      .catch((err) => {
        console.log(err);
      });

    for (let index = 0; index < src.length; index++) {
      if (!key.includes(singleKey[index])) {
        key.push(singleKey[index]);
       
      }
    }
    for (let index = 0; index < drc.length; index++) {
      if (!key.includes(doubleKey[index])) {
        key.push(doubleKey[index]);
      }
    }
    
    setKeys(key);
    setPayment(singleRoomCost * src.length + doubleRoomCost * drc.length);
    console.log(key);
  }, [roomValues, singleKey, doubleKey]); */

  /* Update selected rooms details */
  useEffect(()=>{
    console.log(catagory);
  },[catagory])

  useEffect(() => {
    const room = [];
    
    for (let index = 0; index < catagory.length; index++) {
      const cat = catagory[index];
      const k = keys[index];
      const data = [cat, k];
      room[index] = [data];
    }

    setRooms(room);
  }, [keys, catagory, roomValues]);

  useEffect(() => {
    console.log(format(currentDate, "yyyy/MM/dd"));
  }, [currentDate]);

  /* Get Total payment */
  useEffect(() => {
    const src = roomValues.filter((element) => element === "single");
    const drc = roomValues.filter((element) => element === "double");

    if (departure != null) {
      /* Calculate difference between arrival date and departure date */
      const depDate = new Date(format(parseISO(departure), "yyyy-MM-dd"));

      const arrival = currentDate.getTime();
      const dep = depDate.getTime();
      const miliseconds = dep - arrival;
      const oneDay = 24 * 60 * 60 * 1000;
      const difference = Math.round(miliseconds / oneDay);
      setDifference(difference);
    }

    axios
      .get("http://localhost:8080/Rooms/get-room/cat/single")
      .then((res) => {
        res.data.forEach((element) => {
          setSingleRoomCost(element.price);
        });
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get("http://localhost:8080/Rooms/get-room/cat/double")
      .then((res) => {
        res.data.forEach((element) => {
          setDoubleRoomCost(element.price);
        });
      })
      .catch((err) => {
        console.log(err);
      });

    const total =(singleRoomCost * src.length + doubleRoomCost * drc.length) * difference;
    setPayment(total);
  }, [roomValues, departure, difference]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      setCreated(true);
      const formData = new FormData();
      formData.append("room", rooms);
      formData.append("firstName", firstName);
      formData.append("lastName", lastName);
      formData.append("guestCount", guestCount);
      formData.append("arrival", arrival);
      formData.append("depDate", departure);
      //add new booking
      //update rooms/room status to 'booked'
    }

    setValidated(true);
  };
  /* Send Data to DB */
  const handleSubmitBooking = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      setCreated(true);

      const arDate = format(currentDate, "yyyy-MM-dd");
      const formData = new FormData();
      formData.append("amount", JSON.stringify(payment));
      formData.append("paymentMethode", paymentMethod);
      formData.append("date", arDate);
      axios
        .post("http://localhost:8080/Payment/add-payment", formData)
        .then((res) => {
          console.log("payment Success");
          addNewBooking();
        })
        .catch((err) => {
          console.log(`payment failed'\n'${err}`);
        });
    }

    setValidated(true);
  };
  const addNewBooking = () => {
    const depDate = format(parseISO(departure), "yyyy-MM-dd");
    const arDate = format(currentDate, "yyyy-MM-dd");
    const formData = new FormData();
    formData.append("rooms", catagory);
    formData.append("keys", keys);
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("guestCount", guestCount);
    formData.append("arrivalDate", arDate);
    formData.append("departureDate", depDate);
    formData.append("status", "confirmed");
    axios
      .post("http://localhost:8080/Bookings/add-booking", formData)
      .then((res) => {
        toast.success("success");
        setPaymentOk(true);
      })
      .catch((err) => console.log(err));
  };
  const handleRedirection = () => {
    if (paymentOk) {
      const formData = new FormData();
      formData.append("availability", "booked");

      keys.forEach((element) => {
        axios
          .patch(`http://localhost:8080/Rooms/update-room/${element}`, formData)
          .then((res) => {
            console.log("updated");
            Navigate(`/Reception/${id}`);
          })
          .catch((err) => console.log(err));
      });
    }
  };

  return (
    <div className="crud-body crud-display-block  " style={{ width: "100vw" }}>
      <h1>Add new Booking</h1>
      <div className="logo">
        {" "}
        <img src={Logo} />
      </div>
      <div
        className="crud-form-container crud-display-block "
        style={{ width: "100vw" }}
      >
        <section className="form-panel ">
          <div className="form-container ">
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <div className="form-body">
                <div className="room-info ">
                  Room Information
                  {/* Render form groups based on roomCount */}
                  {Array.from({ length: roomCount }, (_, index) => (
                    <div className="rooms">
                      <Form.Group key={index}>
                        <Form.Label>Room Catagory</Form.Label>
                        <Form.Control
                          type="text"
                          id={`roomCatagory${index}`}
                          value={roomValues[index]}
                          onChange={(e) =>
                            handleRoomChange(index, e.target.value)
                          }
                          placeholder="Room Catagory"
                          required
                          style={{ width: "20rem" }}
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
                      style={{ width: "20rem" }}
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
                      style={{ width: "20rem" }}
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
                      style={{ width: "20rem" }}
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
                      style={{ width: "20rem" }}
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
            Keys for selected Rooms
            {keys.map((element) => {
              return (
                <ul>
                  <li>{element}</li>
                </ul>
              );
            })}
            <Form
              noValidate
              validated={validated}
              onSubmit={handleSubmitBooking}
            >
              <Form.Group>
                <Form.Label htmlFor="payment">Total payment</Form.Label>
                <Form.Control
                  type="number"
                  id="payment"
                  value={payment}
                  placeholder="Room Catagory"
                  required
                />

                <Form.Control.Feedback type="invalid" className="bold" />
              </Form.Group>
              <Form.Group controlId="paymentMethode">
                <Form.Label style={{ width: "20rem" }}>
                  Payment Methode
                </Form.Label>
                <Form.Select
                  defaultValue="Card"
                  onChange={(e) => setPaymentMethod(e.target.value)}
                >
                  <option>Card</option>
                  <option>Cash</option>
                </Form.Select>
              </Form.Group>
              {/*  <Link to={`/Reception/${id}`}> */}
              <Button type="submit" onClick={handleRedirection()}>
                Ok
              </Button>
              {/*  </Link> */}
            </Form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
