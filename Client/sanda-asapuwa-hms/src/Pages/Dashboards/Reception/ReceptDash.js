import React, { useEffect, useState, useRef } from "react";
import "../../../StyleSheets/reception.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SidePanel from "../../../Components/SidePanel";
import Logo from "../../..//Resources/icons8-lotus-64-white.png";
import Button from "react-bootstrap/Button";
import { json, useParams, useSearchParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import axios from "axios";
import { format, parseISO } from "date-fns";
import ScrollPane from "../../../Components/Scrollpane";
import { elements } from "chart.js";
import AddBooking from "../../../Components/AddBooking";
import { Link } from "react-router-dom";
import { Form, InputGroup, Alert } from "react-bootstrap";
export default function ReceptDash() {
  let roomCount = 0;
  let availableRoomCount = 0;
  let booked = 0;

  const { id } = useParams();
  const [bookingId, setBookingId] = useState("");
  const [validated, setValidated] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [position, setPosition] = useState("");
  const [profile, setProfile] = useState("");
  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState([]);
  const [arrivals, setArrivals] = useState("Today");
  const [todayArrivals, setTodayArrivals] = useState([]);
  const [guest, setGuest] = useState([]);
  const [todayCount, setTodayCount] = useState(0);
  const [showGuest, setShowGuest] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date()); // Initialize state with the current date
  /* const [currentDate,setCurrentDate]=useState("2024/03/28"); */
  const [counter, setCounter] = useState([]);
  const [available, setAvailable] = useState(false);
  const bookingRef = useRef(booking);
  const countRef = useRef(counter);
  const guestRef = useRef(guest);
  const [counterId, setCounterId] = useState("");
  const [clicked, setClicked] = useState(false);
  const [token, setToken] = useState(0);
  const [validToken, setValidToken] = useState(false);
  const [income, setIncome] = useState(0);
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      checkToken();
      /*  if(!checkToken()){
      const formData=new FormData();
      formData.append("status",'confirmed');
      axios.get(`http://localhost:8080/Bookings/update-bookings/patch/${bookingId}`,formData)
      .then((res)=>{
        toast.success("Confirmed")
      
    })
    .catch((err)=>console.log(err))
      toast.success("Confirmed")
     } */

      //update booking status
    }

    setValidated(true);
  };
  const checkToken = () => {
    console.log("id:", bookingId);
    let bool = false;

    axios
      .get(`http://localhost:8080/Bookings/get-bookings/id/${bookingId}`)
      .then((res) => {
        if (res.data.token === token) {
          const formData = new FormData();
          formData.append("status", "confirmed");
          axios.patch( `http://localhost:8080/Bookings/update-booking/patch/${bookingId}`,formData)
            .then((res) => {
              toast.success("Confirmed");
            })
            .catch((err) => console.log(err));
        }
        else{
          console.log('error')
        }
      })
      .catch((err) => console.log(err));
  };
  /* get currunt Date */
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

  useEffect(() => {
    axios
      .get(`http://localhost:8080/Employes/empid/${id}`)
      .then((res) => {
        setFirstName(res.data.firstName);
        setLastName(res.data.lastName);
        setPosition(res.data.position);
        setProfile(res.data.profileImg);
        setLoading(false);
      })
      .catch((err) => console.log(err.response));
  });
  /* Get All Bookings */
  useEffect(() => {
    bookingRef.current = booking;
  }, [booking]);
  useEffect(() => {
    /* this will runs only one */
    axios
      .get("http://localhost:8080/Bookings")
      .then((res) => {
        const initialBooking = res.data.filter(
          (element) => element.status === "unconfirmed"
        );
        setBooking(initialBooking);
      })
      .catch((err) => {
        console.log(err);
      });

    const interval = setInterval(() => {
      axios
        .get("http://localhost:8080/Bookings")
        .then((res) => {
          const newBooking = res.data.filter(
            (element) => element.status === "unconfirmed"
          );
          if (
            JSON.stringify(bookingRef.current) !== JSON.stringify(newBooking)
          ) {
            toast.success("New Booking !");

            setBooking(newBooking);
          }
        })

        .catch((err) => {
          console.log(err);
        });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  /* Get today arrivals */
  useEffect(() => {
    const today = booking.filter(
      (element) =>
        format(parseISO(element.arrivalDate), "yyyy/MM/dd") ===
        format(currentDate, "yyyy/MM/dd")
    );
    setTodayArrivals(today);
  }, [booking]);

  /* Get confirmed bookings */
  useEffect(() => {
    guestRef.current = guest;
  }, [guest]);
  useEffect(() => {
    let count = 0;
    axios
      .get(`http://localhost:8080/Bookings`)
      .then((res) => {
        const confirmedGuest = res.data.filter(
          (element) => element.status === "confirmed"
        );
        setGuest(confirmedGuest);
      })
      .catch((err) => console.log(err.response));
  }, [booking, guest]);

  /* get today Countes */
  useEffect(() => {
    countRef.current = counter;
  }, [counter]);
  useEffect(() => {
    axios
      .get("http://localhost:8080/Counts")
      .then((res) => {
        if (JSON.stringify(countRef.current) !== JSON.stringify(res.data)) {
          const result = res.data.filter(
            (element) =>
              format(parseISO(element.date), "yyyy/MM/dd") ===
              format(currentDate, "yyyy/MM/dd")
          );
          setCounter(result);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [booking]);

  /* Add or Update Counter db */
  useEffect(() => {
    console.log(counter.length);
    console.log(todayArrivals);
    if (counter.length == 0 && todayArrivals.length != 0) {
      const formData = new FormData();
      formData.append("date", format(currentDate, "yyyy-MM-dd"));
      formData.append("count", todayArrivals.length);

      axios
        .post("http://localhost:8080/Counts/Add-count", formData)
        .then(console.log("new data added"))
        .catch((err) => console.log(err));
    } else {
      counter.forEach((element) => {
        if (todayArrivals.length != 0) {
          const formData = new FormData();

          formData.append("count", todayArrivals.length);

          axios
            .patch(
              `http://localhost:8080/Counts/update-count/${element.counterID}`,
              formData
            )
            .then(console.log("updated"))
            .catch((err) => console.log(err));
        }
      });
    }
    console.log(currentDate);
  }, [counter, todayArrivals]);

  /* Change date format */
  const changeDateFormat = (date) => {
    return format(parseISO(date), "yyyy/MM/dd");
  };

  const handleArrivals = () => {
    if (arrivals === "Today") {
      setArrivals("All");
    } else {
      setArrivals("Today");
    }
    showGuest ? setShowGuest(false) : setShowGuest();
  };
  const handleGuest = () => {
    setShowGuest(!showGuest);
  };
  /* const checkToken=()=>{
    let correct=false;
    //check if token is correct or not
    axios.get(`http://localhost:8080/Bookings/get-booking/id/${bookingId}`)
    .then((res)=>{
      if(res.data.token===token){
        correct=true;
      }
      return correct;
    })
    .catch((err)=>{
      console.log(err);
    })

  }
  const confirmBooking = () => {
    /* Update status */

  /* if(checkToken()){
    const formData = new FormData();
    formData.append("Status", "confirmed");
    axios
      .patch(
        `http://localhost:8080/Bookings/update-booking/patch/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((res) => {
        toast.success("Confirmed");
       
      })
      .catch((err) => console.log(err));
    }
    else{
      toast.error("incorrect Token");
    } 
    
    
  }; */
  const close = () => {
    setClicked(false);
  };

  const handleClick = (event, id) => {
    setBookingId(id);
    setClicked(true);
  };

  useEffect(() => {
    let total = 0;
    axios
      .get("http://localhost:8080/Payment/get-payment")
      .then((res) => {
        res.data.forEach((element) => {
          total += element.amount;
        });
        setIncome(total);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [booking]);

  useEffect(() => {
    console.log(income);
  }, [income]);
  const render = () => {
    return (
      <div className="body-r">
        <SidePanel
          id={id}
          firstName={firstName}
          lastName={lastName}
          position={position}
          profile={profile}
        />
        <section className="body-panel-r">
          <section className="header">
            <div className="card-container">
              <button className="cards">
                <div>
                 
                  <h2>Today Income</h2>
                </div>
                <div>{income}</div>
              </button>

              <button className="cards" onClick={handleArrivals}>
                <div>
                 
                  <h2>{arrivals} Arrivals</h2>
                </div>
                <div>
                  {arrivals === "All" ? booking.length : todayArrivals.length}
                </div>
              </button>

              <button className="cards" onClick={handleGuest}>
                <div>
                 
                  <h2>Guest Count</h2>
                </div>
                <div>{guest.length}</div>
              </button>
            </div>
          </section>
          <section className="search-bar"></section>
          <section className="body">
            <div className="scrollpane-container-r">
              <div>
                {loading ? (
                  <div className="loading-screen-container-scrollpane">
                    <div className="loading-screen-scrollpane"></div>
                    <ClipLoader
                      color="dodgerblue"
                      loading={true}
                      size={150}
                      aria-label="Loading Spinner"
                      data-testid="loader"
                      className="loading-spinner"
                    />
                  </div>
                ) : (
                  <></>
                )}
              </div>
              {showGuest ? (
                <h1>Guest Reservations</h1>
              ) : (
                <h1>{arrivals === "Today" ? "All" : "Today"} Reservations</h1>
              )}
              <ScrollPane height="35rem">
                {(() => {
                  if (showGuest) {
                    if (guest.length === 0) {
                      return <div>No guest</div>;
                    } else {
                      return guest.map((guest) => {
                        return (
                          <div>
                            <div className="crud-container">
                              <div className="crud-img">
                                <img src={Logo} alt={guest.images} />
                              </div>
                              <div className="crud-info">
                                booking Id:{guest.bookingId}
                                <br />
                                guest Name: {guest.firstName} {guest.lastName}
                                <br />
                                arrival Date:
                                {changeDateFormat(guest.arrivalDate)}
                              </div>
                            </div>
                          </div>
                        );
                      });
                    }
                  } else if (arrivals === "Today") {
                    return (
                      <div>
                        {booking.map((booking) => {
                          return (
                            <div>
                              <div className="crud-container">
                                <div className="crud-img">
                                  <img src={Logo} alt={booking.images} />
                                </div>
                                <div className="crud-info">
                                  booking Id:{booking.bookingId}
                                  <br />
                                  guest Name: {booking.firstName}{" "}
                                  {booking.lastName}
                                  <br />
                                  arrival Date:
                                  {changeDateFormat(booking.arrivalDate)}
                                  <br />
                                  Status: {booking.status}
                                  <Button
                                    id={booking.bookingId}
                                    className="btn-update "
                                    as="input"
                                    type="submit"
                                    value={
                                      booking.status === "confirmed"
                                        ? "Confirmed"
                                        : "Confirm"
                                    }
                                    onClick={(e) =>
                                      handleClick(e, booking.bookingId)
                                    }
                                    disabled={
                                      booking.status === "confirmed"
                                        ? true
                                        : false
                                    }
                                  />
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    );
                  } else if (todayArrivals.length === 0) {
                    return (
                      <div>
                        <h1>No Reservations for today</h1>
                      </div>
                    );
                  } else {
                    return (
                      <div>
                        {todayArrivals.map((booking) => {
                          return (
                            <div>
                              <div className="crud-container">
                                <div className="crud-img">
                                  <img src={Logo} alt={booking.images} />
                                </div>
                                <div className="crud-info">
                                  booking Id:{booking.bookingId}
                                  guest Name: {booking.firstName}{" "}
                                  {booking.lastName}
                                  arrival Date:
                                  {changeDateFormat(booking.arrivalDate)}
                                  <Button
                                    id={booking.bookingId}
                                    className="btn-update "
                                    as="input"
                                    type="submit"
                                    value={
                                      booking.status === "confirmed"
                                        ? "Confirmed"
                                        : "Confirm"
                                    }
                                    onClick={() => {
                                      setClicked(true);
                                    }}
                                    disabled={
                                      booking.status === "confirmed"
                                        ? true
                                        : false
                                    }
                                  />
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    );
                  }
                })()}
              </ScrollPane>
              <Link to={`/AddNewBooking/${id}`}>
                {" "}
                <Button>Add new Booking</Button>
              </Link>
            </div>
          </section>
        </section>
        <ToastContainer />
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
              <button className="close-button" onClick={close}>
                Close
              </button>
            </div>
            <div className="alert-container">
              <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group>
                  <Form.Label>Token</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Token"
                    value={token}
                    required
                    style={{ width: "20rem" }}
                    onChange={(e) => setToken(e.target.value)}
                  />
                  <Form.Control.Feedback type="invalid" className="bold" />
                </Form.Group>
                <Button type="submit">Confirme</Button>
              </Form>
            </div>
          </div>
        </div>
      </div>
    );
  };
  return (
    <div>
      {loading ? (
        <div className="loading-screen-container">
          <div className="loading-screen"></div>
          <ClipLoader
            color="dodgerblue"
            loading={true}
            size={150}
            aria-label="Loading Spinner"
            data-testid="loader"
            className="loading-spinner"
          />
        </div>
      ) : (
        <>{render()}</>
      )}
    </div>
  );
}
