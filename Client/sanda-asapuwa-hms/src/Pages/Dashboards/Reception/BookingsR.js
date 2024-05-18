import React from "react";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import SidePanel from "../../../Components/SidePanel";
import Logo from "../../../Resources/icons8-lotus-64-white.png";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Scrollpane from "../../../Components/Scrollpane";
import { ClipLoader } from "react-spinners";
import { Alert } from "react-bootstrap";
import { format, parseISO } from "date-fns";
import { elements } from "chart.js";
export default function BookingsR() {
  const { id } = useParams();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [position, setPosition] = useState("");
  const [profile, setProfile] = useState("");
  const [loading, setLoading] = useState(true);
  const[currentDate,setCurrentDate]=useState(new Date());
  const [bookings, setBookings] = useState([]);
  const[todayBooking,setTodayBooking]=useState([]);
  const[inHouse,setInHouse]=useState([]);
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
  const click = () => {
    alert("clicked");
  };
  useEffect(() => {
    axios
      .get(`http://localhost:8080/Bookings`)
      .then((res) => {
        setBookings(res.data);
        const today=res.data.filter(element=>element.arrivalDate===format((currentDate),'yyyy-MM-dd'));
        const inhouse=res.data.filter(element=>element.status==='confirmed');
        setTodayBooking(today);
        setInHouse(inhouse);
      })
      .catch((err) => console.log(err.response));
  });
  const render=()=>{
    
    return(
      <section className="body">
<section className="header">
              <SidePanel
                id={id}
                firstName={firstName}
                lastName={lastName}
                position={position}
                profile={profile}
              />
            </section>
            <section className="body-panel">
              Reservations information
              <div className="card-container align-items-center">
                <div className="cards">
                  <div>
                    <img src={Logo} />
                    <h2>Total Reservations</h2>
                  </div>
                  <div>{bookings.length}</div>
                </div>

                <div className="cards">
                  <div>
                    <img src={Logo} />
                    <h2>Today Reservations</h2>
                  </div>
                  <div>{todayBooking.length}</div>
                </div>

                <div className="cards">
                  <div>
                    <img src={Logo} />
                    <h2>In house</h2>
                  </div>
                  <div>{inHouse.length}</div>
                </div>
              </div>
              <div className="search-bar">
                <input type="text" placeholder="Sesssarch here..." />
              </div>
              <h1>All Reservation</h1>
              <div className="scrollpane-container">
                <div>
                 
                </div>
                <Scrollpane>
                  <div className="table">
                    <Table striped bordered hover>
                      <thead>
                        <tr>
                          <th>Booking ID</th>
                          <th>Rooms</th>
                          <th>Full Name</th>
                          <th>Guest count</th>
                          <th>Arrived at</th>
                          <th>Departure</th>
                        </tr>
                      </thead>
                      <tbody>
                        {bookings.map((element) => {
                          return (
                            <tr>
                              <td>{element.bookingId}</td>
                              <td>
                                <ul>
                                  {element.rooms.map((room) => {
                                    return <li>{room}</li>;
                                  })}
                                </ul>
                              </td>
                              <td>
                                {element.firstName + " " + element.lastName}
                              </td>
                              <td>{element.guestCount}</td>
                              <td>
                                {format(
                                  parseISO(element.arrivalDate),
                                  "yyyy-MM-dd"
                                )}
                              </td>
                              <td>
                                {format(
                                  parseISO(element.departureDate),
                                  "yyyy-MM-dd"
                                )}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </Table>
                  </div>
                </Scrollpane>
              </div>
            </section>
       </section>

    )
  }
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
          <>
            {render()}
          </>
        )}
     
    </div>
  );
}
