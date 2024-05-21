import React from "react";
import { useState, useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import SidePanel from "../../../Components/SidePanel";
import Logo from "../../../Resources/icons8-lotus-64-white.png";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Scrollpane from "../../../Components/Scrollpane";
import { ClipLoader } from "react-spinners";
import { Alert } from "react-bootstrap";
import { elements } from "chart.js";
import { format, parseISO } from "date-fns";
import totalreservation from '../../../Resources/icons/total-reservations.png';
import todayreservation from '../../../Resources/icons/today.png';
import inhouseguest from '../../../Resources/icons/in-house.png';
export default function Bookings() {
  const { id } = useParams();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [position, setPosition] = useState("");
  const [profile, setProfile] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [inHouse, setInHouse] = useState([]);
  const [booking, setBooking] = useState([]);
  const [todayBooking, setTodayBooking] = useState([]);
  const [todayDeparture, setTodayDeparture] = useState([]);
  const [title, setTitle] = useState("All Reservations");

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
  const bookingRef = useRef(booking);
  useEffect(() => {
    bookingRef.current = booking;
  }, [booking]);
  useEffect(() => {
    const interval = setInterval(() => {
      axios
        .get(`http://localhost:8080/Bookings`)
        .then((res) => {
          if (JSON.stringify(bookingRef.current) !== JSON.stringify(res.data)) {
            setBooking(res.data);
            const unconfirmed = res.data.filter(
              (element) => element.status === "unconfirmed"
            );
            const today = unconfirmed.filter(
              (element) =>
                format(parseISO(element.arrivalDate), "yyyy-MM-dd") ===
                format(currentDate, "yyyy-MM-dd")
            );

          const todaydep = res.data.filter(
              (element) =>
                format(parseISO(element.departureDate), "yyyy-MM-dd") ===
                format(currentDate, "yyyy-MM-dd")
            );
            setTodayBooking(today);
            setTodayDeparture(todaydep);
            
            console.log(todaydep);
          }
        })
        .catch((err) => console.log(err.response));
    }, 1000);
    return () => clearInterval(interval);
  });
  /* get inhouse count */
  useEffect(()=>{
   const arr=[];
    booking.forEach((element)=>{
      const departureDate=new Date(format((element.departureDate),'yyyy-MM-dd'));
      if((departureDate.getMonth()===currentDate.getMonth()&&departureDate.getDate()>currentDate.getDate()) || (departureDate.getMonth>currentDate.getMonth)){
        arr.push(element);
      }
    


    }
    )
    setInHouse(arr);
  },[booking])


  const click = () => {
    alert("clicked");
  };
  const renderTable = (title) => {
    if(title==="All Reservations")
    {
      return(
        <div className="table">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Booking ID</th>
              <th>Rooms</th>
              <th>Keys</th>
              <th>Full Name</th>
              <th>Guest count</th>
              <th>Arrived at</th>
              <th>Departure</th>
            </tr>
          </thead>
          <tbody>
            {booking.map((element) => {
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
                    <ul>
                      {element.keys.map((key) => {
                        return <li>{key}</li>;
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
      )
          }
   
    else if(title=="Today Reservations"){
      return(
        <div className="table">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Booking ID</th>
              <th>Rooms</th>
              <th>Full Name</th>
              <th>Guest count</th>
            
              <th>Departure</th>
            </tr>
          </thead>
          <tbody>
            {todayBooking.map((element) => {
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
      )
    }
    else if(title=="In House"){
      return(
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
            {inHouse.map((element) => {
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
      )
    }
    else if(title=="Today Departure"){
      return(
        <div className="table">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Booking ID</th>
              <th>Rooms</th>
              <th>Key No</th>
              <th>Full Name</th>
              <th>Guest count</th>
              <th>Arrived at</th>
              
            </tr>
          </thead>
          <tbody>
            {todayDeparture.map((element) => {
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
                    <ul>
                      {element.keys.map((key) => {
                        return <li>{key}</li>;
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
                  
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
      )
    } 
  };

  return (
    <div>
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
            <button
              className="cards"
              onClick={() => setTitle("All Reservations")}
            >
              <div>
                <img src={totalreservation} />
                <h2>Total Reservations</h2>
              </div>
              <div>{booking.length}</div>
            </button>

            <button
              className="cards"
              onClick={() => setTitle("Today Reservations")}
            >
              <div>
                <img src={todayreservation} />
                <h2>Today Reservations</h2>
              </div>
              <div>{todayBooking.length}</div>
            </button>

            <button className="cards" onClick={() => setTitle("In House")}>
              <div>
                <img src={inhouseguest} />
                <h2>In House Guests</h2>
              </div>
              <div>{inHouse.length}</div>
            </button>
          </div>
          <div className="search-bar">
            <input type="text" placeholder="Search here..." />
          </div>
          <div className="scrollpane-container">
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
                <>
                  <h1>{title}</h1>
                  <div className="scrollpane-container">
                  <Scrollpane height="55vh" width="75vw">
                    {renderTable(title)}
                  </Scrollpane>
                  </div>
                </>
              )}
            </div>
          </div>
        </section>
      </section>
    </div>
  );
}
