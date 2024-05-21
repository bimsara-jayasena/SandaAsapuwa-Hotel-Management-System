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
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import ScrollPane from "../../../Components/Scrollpane";
import TotalIncome from '../../../Resources/icons/total-income.png';
import bookedrooms from '../../../Resources/icons/booked-rooms.png';
import inhouseguest from '../../../Resources/icons/in-house.png';
import staff from '../../../Resources/icons/staff.png';
export default function ManagerDash() {
  let roomCount = 0;
  let availableRoomCount = 0;
 
  const { id } = useParams();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [position, setPosition] = useState("");
  const [profile, setProfile] = useState("");
  const [loading, setLoading] = useState(true);
  const [employes, setEmployes] = useState([]);
  
  const [inhouse, setInHouse] = useState([]);
  const [booking, setBooking] = useState([]);
  const [booked, setBooked] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const bookingRef = useRef(booking);
  const [checked, setChecked] = useState(false);
  const [radioValue, setRadioValue] = useState("1");
  const [income, setIncome] = useState(0);
  const [view, setView] = useState("month");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  
  const [date, setDate] = useState("");
  const [dateRange, setDateRange] = useState([null, null]);
  const [week, setWeek] = useState([]);
  const [month, setMonth] = useState([]);
  const radios = [
    { name: "Weekly", value: "1" },
    { name: "Monthly", value: "2" },
    { name: "Yearly", value: "3" },
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
        const arr=res.data.filter(element=>element.availability==='available')
        setEmployes(arr);
      })
      .catch((err) => console.log(err.response));
  }, []);

 

  /* Get all bookings */
  useEffect(() => {
    bookingRef.current = booking;
  }, [booking]);
 
  

  const bookedRoomsRef=useRef([]);
  useEffect(()=>{
    bookedRoomsRef.current=booked;
  },[booked])
  useEffect(() => {
    axios
      .get("http://localhost:8080/Bookings")
      .then((res) => {
        setBooking(res.data);
        
      })
      .catch((err) => {
        console.log(err);
      });
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
        /* Get booked rooms */
        axios
        .get(`http://localhost:8080/Rooms`)
        .then((res) => {
          const arr=res.data.filter(element=>element.availability==='booked')
          if (JSON.stringify(bookingRef.current) !== JSON.stringify(arr)) {
           setBooked(arr);
            
          }
         
        })
        .catch((err) => console.log(err.response));

    }, 1000);
    return () => clearInterval(interval);
  }, []);
  
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

  /* Get income */
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
      .catch((err) => console.log(err));
  }, [booking]);

  /* seEffect(() => {
    axios
      .get(`http://localhost:8080/Bookings`)
      .then((res) => {
        const result = res.data.filter(
          (element) => element.status == "Confirmed"
        );
        setGuest(result);
      })
      .catch((err) => console.log(err.response));
  }, [booking]); */

  const changeView = (value) => {
    if (value == 1) {
      setView("month");
    } else if (value == 2) {
      setView("year");
    } else if (value == 3) {
      setView("decade");
    }
  };
  const prevStartDate=useRef(startDate);
  const prevEndDate=useRef(endDate);

  useEffect(()=>{prevStartDate.current=startDate},[startDate]);
  useEffect(()=>{prevEndDate.current=endDate},[endDate]);

  const getdateInfo = (event) => {
    if (view === "month") {
      if (date === "") {
        setDate("select start and end");
      }
    } else if (view === "year") {
      const selectedDate=event.getFullYear() + "-" +(event.getMonth() + 1)+ "-" +event.getDate()
      if (!startDate  && !endDate) {
        setStartDate( selectedDate);
      } 
      else if (startDate&& !endDate){
        setEndDate( selectedDate);
      }
      else{
        setStartDate(selectedDate);
        setEndDate("");
      }
     
    } 
    else if (view === "decade") {
      setDate(event.getFullYear());
      const selectedDate=event.getFullYear() + "-" +(event.getMonth() + 1)+ "-" +event.getDate()
      if (!startDate  && !endDate) {
        setStartDate( selectedDate);
      } 
      else if (startDate&& !endDate){
        setEndDate( selectedDate);
      }
      else{
        setStartDate(selectedDate);
        setEndDate("");
      }
    }
  };
  const handleRangeChange = (value) => {
    setDateRange(value);
  };
  const getWeek = () => {
    const [start, end] = dateRange;
    if (start && end) {
      const [start, end] = dateRange;
      const startdate = new Date(start);
      const enddate = new Date(end);

      const formattedStartDate = format(startdate, "yyyy-MM-dd");
      const formattedEndDate = format(enddate, "yyyy-MM-dd");
      setStartDate(formattedStartDate);
      setEndDate(formattedEndDate);
    /*   axios
        .get(
          `http://localhost:8080/Counts/get-counts/${formattedStartDate}/${formattedEndDate}`
        )
        .then((res) => console.log(res.data))
        .catch((err) => console.log(err)); */
    }
  };
  useEffect(() => {
    getWeek();
  }, [dateRange]);

/*   useEffect(() => {
    console.log("============================")
    console.log("starting date",startDate);
    console.log("ending date",endDate);
    console.log("============================")
  }, [startDate,endDate]); */

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
                      <img src={TotalIncome} />
                      <h2>Total Income</h2>
                    </div>
                    <div>{income}</div>
                  </div>

                  <div className="cards">
                    <div>
                      <img src={bookedrooms} />
                      <h2>Booked Rooms</h2>
                    </div>
                    <div>{booked.length}</div>
                  </div>

                  <div className="cards">
                    <div>
                      <img src={inhouseguest} />
                      <h2>In house Guest</h2>
                    </div>
                    <div>{inhouse.length}</div>
                  </div>

                  <div className="cards">
                    <div>
                      <img src={staff} />
                      <h2>Staff Count</h2>
                    </div>
                    <div>{employes.length}</div>
                  </div>
                  
                </div>
              </section>

              <section className="body">
                <div className="chart-section">
                  <div className="title">Weekly Booking Analysis</div>

                  <div className="chart-container">
                    <div className="chart">
                      <Chart startDate={startDate} endDate={endDate} timeSpan={view}/>
                    </div>
                    <Calendar
                      view={view}
                      selectRange
                      onChange={handleRangeChange}
                      value={dateRange}
                      onClickDay={(e) => getdateInfo(e)}
                      onClickMonth={(e) => getdateInfo(e)}
                      onClickYear={(e) => getdateInfo(e)}
                    />
                  </div>
                  <ButtonGroup>
                    {radios.map((radio, idx) => (
                      <ToggleButton
                        key={idx}
                        id={`radio-${idx}`}
                        type="radio"
                        variant={"outline-primary"}
                        name="radio"
                        value={radio.value}
                        checked={radioValue === radio.value}
                        onChange={(e) => setRadioValue(e.currentTarget.value)}
                        onClick={(e) => changeView(radio.value)}
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
