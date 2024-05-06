import React, { useEffect, useState } from "react";
import "../../../StyleSheets/reception.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SidePanel from "../../../Components/SidePanel";
import Logo from "../../..//Resources/icons8-lotus-64-white.png";
import Button from "react-bootstrap/Button";
import { useParams, useSearchParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import axios from "axios";
import { format, parseISO } from "date-fns";
import ScrollPane from "../../../Components/Scrollpane";

export default function ReceptDash() {
  let roomCount = 0;
  let availableRoomCount = 0;
  let booked = 0;

  const { id } = useParams();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [position, setPosition] = useState("");
  const [profile, setProfile] = useState("");
  const [loading, setLoading] = useState(false);
  const [booking, setBooking] = useState([]);
  const [arrivals, setArrivals] = useState("Today");
  const [todayArrivals, setTodayArrivals] = useState([]);
  const [guest, setGuest] = useState([]);

  const [showGuest, setShowGuest] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date()); // Initialize state with the current date

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
  });

  useEffect(() => {
    axios
      .get(`http://localhost:8080/Bookings`)
      .then((res) => {
        setBooking(res.data);
        const today = res.data.filter(
          (element) => element.arrivalDate === currentDate
        );
        setTodayArrivals(today);
      })
      .catch((err) => console.log(err.response));
  }, [currentDate, guest]);
  /*  useEffect(() => {
    booking.map((book) => {
      if (book.arrivalDate === currentDate) {
        setTodayArrivals(book);
      }
      const today=res.
    });
  }, [currentDate]); */

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
  const handleConfirm = (event) => {
    const id = event.target.id;
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
        event.target.value = "confirmed";
        event.target.disabled = true;
      })
      .catch((err) => console.log(err));
    console.log(id);
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
        <></>
      )}
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
                  <img src={Logo} />
                  <h2>Total Income</h2>
                </div>
                <div>{roomCount}</div>
              </button>

              <button className="cards" onClick={handleArrivals}>
                <div>
                  <img src={Logo} />
                  <h2>{arrivals} Arrivals</h2>
                </div>
                <div>
                  {arrivals === "All" ? booking.length : todayArrivals.length}
                </div>
              </button>

              <button className="cards" onClick={handleGuest}>
                <div>
                  <img src={Logo} />
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
              <ScrollPane height="40rem">
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
                                <img src="" alt={guest.images} />
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
                                  <img src="" alt={booking.images} />
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
                                    onClick={(e) => {
                                      handleConfirm(e);
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
                  } else {
                    if (todayArrivals.length === 0) {
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
                                    <img src="" alt={booking.images} />
                                  </div>
                                  <div className="crud-info">
                                    booking Id:{booking.bookingId}
                                    guest Name: {booking.firstName}{" "}
                                    {booking.lastName}
                                    arrival Date:
                                    {changeDateFormat(booking.arrivalDate)}
                                    <Button
                                      id={booking.roomId}
                                      className="btn-update "
                                      value="UPDATE"
                                    >
                                      Confirm
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      );
                    }
                  }
                })()}
              </ScrollPane>
            </div>
          </section>
        </section>
        <ToastContainer />
      </div>
    </div>
  );
}
