import React, { useRef } from "react";
import axios from "axios";
import { format, parseISO } from "date-fns";
import { useEffect } from "react";
import { elements } from "chart.js";
import { useState } from "react";
import { useParams } from "react-router-dom";
import SidePanel from "../../../Components/SidePanel";
import Table from "react-bootstrap/Table";
import { Button } from "react-bootstrap";
import {ClipLoader} from  'react-spinners';
import ScrollPane from "../../../Components/Scrollpane";
export default function Income() {
  const { id } = useParams();
  const [todayIncome, setTodayIncome] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);
  const [cardPayments, setCardPayments] = useState(0);
  const [cashPayments, setCashPayments] = useState(0);
  const [income, setIncome] = useState([]);
  const [today, setToday] = useState([]);
  const [card, setCard] = useState([]);
  const [cash, setCash] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [position, setPosition] = useState("");
  const [profile, setProfile] = useState("");
  const [title, setTitle] = useState("All Incomes");
  const [loading,setLoading]=useState(true);
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

  /* Get all incomes */
  const incomeRef = useRef(Income);
  useEffect(() => {
    incomeRef.current = Income;
  }, [Income]);
  useEffect(() => {
    const interval = setInterval(() => {
      axios
        .get("http://localhost:8080/Payment/get-payment")
        .then((res) => {
          if (JSON.stringify(incomeRef.current) !== JSON.stringify(res.data)) {
            setIncome(res.data);
            const todayincome = res.data.filter(
              (element) => element.date === format(currentDate, "yyyy-MM-dd")
            );
            const cardpayments = res.data.filter(
              (element) => element.paymentMethod === "Card"
            );
            const cashpayments = res.data.filter(
              (element) => element.paymentMethod === "Cash"
            );
            setToday(todayincome);
            setCard(cardpayments);
            setCash(cashpayments);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let todayIncome = 0;
    let totalIncome = 0;
    let cardPayments = 0;
    let cashPayments = 0;
    income.forEach((element) => {
      totalIncome += element.amount;
      setTotalIncome(totalIncome);
      if (
        format(parseISO(element.date), "yyyy-MM-dd") ===
        format(currentDate, "yyyy-MM-dd")
      ) {
        todayIncome += element.amount;
        setTodayIncome(todayIncome);
      }
      if (element.paymentMethod === "Card") {
        cardPayments += element.amount;
        setCardPayments(cardPayments);
      } else if (element.paymentMethod === "Cash") {
        cashPayments += element.amount;
        setCashPayments(cashPayments);
      }
    });
  }, [income]);

  useEffect(() => {
    console.log(todayIncome);
  }, [todayIncome]);

  const renderTable = (title) => {
    if (title === "All Incomes") {
      return (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>date</th>
              <th>Payment Methode</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {income.map((income) => {
              return (
                <tr>
                  <td>{format(parseISO(income.date), "yyyy-MM-dd")}</td>
                  <td>{income.paymentMethod}</td>
                  <td>{income.amount}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      );
    } else if (title === "Today Income") {
      if (today.length == 0) {
        return <h1>Looks like there's no payments happen in today:(</h1>;
      } else {
        return (
          <div>
            <button className="cards">
          <div>
            <img src="" />
            <h2>No. of Cash Payments</h2>
          </div>
          <div>{cash.length}</div>
          </button>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Guest Name</th>
                <th>Payment Methode</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {today.map((income) => {
                return (
                  <tr>
                    <td>{/* guest name */}</td>
                    <td>{income.paymentMethod}</td>
                    <td>{income.amount}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
          </div>
        );
      }
    } else if (title === "Cash Payments") {
      if(cash.length==0){return(<h1>Looks like there's no Cash payments</h1>)}
      else{
        return (
          <div>
            <button className="cards">
          <div>
            <img src="" />
            <h2>No. of Cash Payments</h2>
          </div>
          <div>{cash.length}</div>
          </button>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>date</th>
                <th>Guest Name</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {cash.map((income) => {
                return (
                  <tr>
                    <td>{format(parseISO(income.date), "yyyy-MM-dd")}</td>
                    <td>{/* guest name */}</td>
                    <td>{income.amount}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
          </div>
        );
      }
    } else if (title === "Card payments") {
     if(card.length==0){return(<h1>Looks like there's no card payments </h1>)}
     else{
      return (
       <div>
         <button className="cards" style={{width:'80rem'}}> 
          <div>
            <img src="" />
            <h2>No. of Card Payments</h2>
          </div>
          <div>{card.length}</div>
          </button>
         <Table striped bordered hover>
          <thead>
            <tr>
              <th>date</th>
              <th>guest name</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {card.map((income) => {
              return (
                <tr>
                  <td>{format(parseISO(income.date), "yyyy-MM-dd")}</td>
                  <td>{/* guest name */}</td>
                  <td>{income.amount}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
       </div>
      );
     }
    }
  };

  const render=()=>{
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
              <button className="cards" onClick={() => setTitle("All Incomes")}>
                <div>
                  <img src="" />
                  <h2>Total Income</h2>
                </div>
                <div>{totalIncome}</div>
              </button>
  
              <button className="cards" onClick={() => setTitle("Today Income")}>
                <div>
                  <img src="" />
                  <h2>Today Income</h2>
                </div>
                <div>{todayIncome}</div>
              </button>
  
              <button className="cards" onClick={() => setTitle("Card payments")}>
                <div>
                  <img src="" />
                  <h2>Card Payments</h2>
                </div>
                <div>{cardPayments}</div>
              </button>
  
              <button className="cards" onClick={() => setTitle("Cash Payments")}>
                <div>
                  <img src="" />
                  <h2>Cash Payments</h2>
                </div>
                <div>{cashPayments}</div>
              </button>
            </div>
          </section>
          <h1>{title}</h1>
          <section className="body">
          <div className="scrollpane-container"> <ScrollPane height='50vh' width='75vw'> {renderTable(title)}</ScrollPane></div>
            </section>
        </section>
      </div>
    );
  }

  return (
    <div>
   {loading ? <div className="loading-screen-container">
                <div className="loading-screen"></div>
                <ClipLoader
                                    color="dodgerblue"
                                    loading={true}
                                    size={150}
                                    aria-label="Loading Spinner"
                                    data-testid="loader"
                                    className="loading-spinner"
                                />
                     </div>:<> {render()}</>}
   
    
    </div>
  );
}
