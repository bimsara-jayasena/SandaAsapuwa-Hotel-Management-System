import React, { useEffect, useRef, useState } from "react";
import "../../../StyleSheets/manager.css";
import SidePanel from "../../../Components/SidePanel";
import Chart from "../../../Components/Chart";
import Logo from "../../..//Resources/icons8-lotus-64-white.png";
import { useParams, useSearchParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { elements } from "chart.js";
import { format, parseISO } from "date-fns";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import ScrollPane from "../../../Components/Scrollpane";
export default function ManagerDash() {
  let roomCount = 0;
  let availableRoomCount = 0;
  let booked = 0;
  const { id } = useParams();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [position, setPosition] = useState("");
  const [profile, setProfile] = useState("");
  const [loading, setLoading] = useState(true);
  const [employes, setEmployes] = useState([]);
  const [availableEmployes, setAvailableEmployes] = useState([]);
  const [guest, setGuest] = useState([]);
  const [booking, setBooking] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const bookingRef = useRef(booking);
  const employeRef = useRef(availableEmployes);
  const [checked, setChecked] = useState(false);
  const [radioValue, setRadioValue] = useState('1');
  const radios = [
    { name: 'Weekly', value: '1' },
    { name: 'Monthly', value: '2' },
    { name: 'Yearly', value: '3' },
  ];

  useEffect(() => {
    // Function to calculate the milliseconds until midnight
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
      return midnight - now;
    };

    // Set timeout to update the date at midnight
    const timeoutId = setTimeout(() => {
      setCurrentDate(new Date()); // Update the date after timeout
    }, timeToMidnight());

    return () => clearTimeout(timeoutId); // Clear the timeout if the component unmounts
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
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/Employes`)
      .then((res) => {
        setEmployes(res.data);
      })
      .catch((err) => console.log(err.response));
  }, []);

  useEffect(() => {
    employeRef.current = availableEmployes;
  }, [availableEmployes]);
  useEffect(() => {
    const interval = setInterval(() => {
      axios
        .get(`http://localhost:8080/Employes`)
        .then((res) => {
          const emp = res.data.filter(
            (element) => element.position === "available"
          );
          if (JSON.stringify(employeRef.current) !== JSON.stringify(emp)) {
            toast.success("New employee added");
            setAvailableEmployes(emp);
          }
        })
        .catch((err) => console.log(err.response));
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  useEffect(() => {
    console.log(availableEmployes);
  }, [availableEmployes]);

  /* Get all bookings */
  useEffect(() => {
    bookingRef.current = booking;
  }, [booking]);
  useEffect(() => {
    const interval = setInterval(() => {
      axios
        .get(`http://localhost:8080/Bookings`)
        .then((res) => {
          if (JSON.stringify(bookingRef.current) !== JSON.stringify(res.data)) {
            toast.success("New Booking!");
            setBooking(res.data);
          }
        })
        .catch((err) => console.log(err.response));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/Bookings`)
      .then((res) => {
        const result = res.data.filter(
          (element) => element.status == "Confirmed"
        );
        setGuest(result);
      })
      .catch((err) => console.log(err.response));
  }, [booking]);

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
        <></>
      )}
      <div className="body">
        <SidePanel
          id={id}
          firstName={firstName}
          lastName={lastName}
          position={position}
          profile={profile}
        />
       <section className="scrollpane-container full-height custom-width">
       <ScrollPane>
      <section className="body-panel">
          <section className="header">
            <div className="card-container">
              <div className="cards">
                <div>
                  <img src={Logo} />
                  <h2>Total Income</h2>
                </div>
                <div>{roomCount}</div>
              </div>

              <div className="cards">
                <div>
                  <img src={Logo} />
                  <h2>Booked Rooms</h2>
                </div>
                <div>{booking.length}</div>
              </div>

              <div className="cards">
                <div>
                  <img src={Logo} />
                  <h2>Guest Count</h2>
                </div>
                <div>{guest.length}</div>
              </div>

              <div className="cards">
                <div>
                  <img src={Logo} />
                  <h2>Staff Count</h2>
                </div>
                <div>{availableEmployes.length}</div>
              </div>
              <div className="cards">
                <div>
                  <img src={Logo} />
                  <h2>Reviews</h2>
                </div>
                <div>{availableRoomCount}</div>
              </div>
            </div>
          </section>

          <section className="body">
            <div className="chart-section">
              <div className="title">Weekly Booking Analysis</div>

              <div className="chart-container">
                <div className="chart">
                  <Chart />
                </div>
                <Calendar />
              </div>
              <ButtonGroup>
        {radios.map((radio, idx) => (
          <ToggleButton
            key={idx}
            id={`radio-${idx}`}
            type="radio"
            variant={ 'outline-primary' }
            name="radio"
            value={radio.value}
            checked={radioValue === radio.value}
            onChange={(e) => setRadioValue(e.currentTarget.value)}
          >
            {radio.name}
          </ToggleButton>
        ))}
      </ButtonGroup>
            </div>
          </section>
        </section>
      </ScrollPane>
       </section>
      </div>
      <ToastContainer />
    </div>
  );
}
