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
import { elements } from "chart.js";
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
      })
      .catch((err) => console.log(err.response));
  });
  useEffect(() => {
    axios
      .get(`http://localhost:8080/Bookings`)
      .then((res) => {
        setBookings(res.data);
        const unconfirmed = res.data.filter(
          (element) => element.status === "unconfirmed"
        );
        const today = unconfirmed.filter(
          (element) =>
            format(parseISO(element.arrivalDate), "yyyy-MM-dd") ===
            format(currentDate, "yyyy-MM-dd")
        );

        const inhouse = res.data.filter(
          (element) => element.status === "confirmed"
        );
        const todaydep = res.data.filter(
          (element) =>
            format(parseISO(element.departureDate), "yyyy-MM-dd") ===
            format(currentDate, "yyyy-MM-dd")
        );
        setTodayBooking(today);
        setTodayDeparture(todaydep);
        setInHouse(inhouse);
        console.log(todaydep);
      })
      .catch((err) => console.log(err.response));
  });
  const click = () => {
    alert("clicked");
  };
  const renderTable = () => {
   
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
            <div className="cards">
              <div>
                <img src={Logo} />
                <h2>Total Reservations</h2>
              </div>
              <div>2</div>
            </div>

            <div className="cards">
              <div>
                <img src={Logo} />
                <h2>Today Reservations</h2>
              </div>
              <div>2</div>
            </div>

            <div className="cards">
              <div>
                <img src={Logo} />
                <h2>In House Guests</h2>
              </div>
              <div>0</div>
            </div>
          </div>
          <div className="search-bar">
            <input type="text" placeholder="Search here..." />
          </div>
          <div className="scrollpane-container">
            <div>
              {/* {loading ? (
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
              )}  */}
            </div>
          </div>
        </section>
      </section>
    </div>
  );
}
