import React, { useRef } from "react";
import axios from "axios";
import { format, parseISO } from "date-fns";
import { useEffect } from "react";
import { elements } from "chart.js";
import { useState } from "react";
import { useParams } from "react-router-dom";
import SidePanel from "../../../Components/SidePanel";
import  Table  from "react-bootstrap/Table";
export default function Income() {
  const { id } = useParams();
  const [todayIncome, setTodayIncome] = useState(0);
  const [totalIncome,setTotalIncome]=useState(0);
  const [cardPayments,setCardPayments]=useState(0);
  const [cashPayments,setCashPayments]=useState(0);
  const [income, setIncome] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [position, setPosition] = useState("");
  const [profile, setProfile] = useState("");
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
      })
      .catch((err) => console.log(err.response));
  });

  /* Get all incomes */
  const incomeRef=useRef(Income);
  useEffect(()=>{
    incomeRef.current=Income;
  },[Income])
  useEffect(() => {
    const interval=setInterval(()=>{
        axios.get("http://localhost:8080/Payment/get-payment")
    .then((res) => {
      if(JSON.stringify(incomeRef.current)!==JSON.stringify(res.data)){
        setIncome(res.data);
      }
    })
    .catch((err)=>{console.log(err)})
    },1000)
    return ()=>clearInterval(interval);
  }, []);

  useEffect(() => {
    let todayIncome=0;
    let totalIncome=0;
    let cardPayments=0;
    let cashPayments=0;
    income.forEach((element)=>{
        totalIncome+=element.amount;
        setTotalIncome(totalIncome);
        if(format(parseISO(element.date),'yyyy-MM-dd')===format((currentDate),'yyyy-MM-dd')){
            todayIncome+=element.amount;
            setTodayIncome(todayIncome);
        }
        if(element.paymentMethod==="Card"){
           cardPayments+=element.amount;
            setCardPayments(cardPayments);
        }
        else if(element.paymentMethod==="Cash"){
            cashPayments+=element.amount;
             setCashPayments(cashPayments);
         }

    })
  }, [income]);

  useEffect(() => {
    console.log(todayIncome);
  }, [todayIncome]);

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
                <img src="" />
                <h2>Total Income</h2>
              </div>
              <div>{totalIncome}</div>
            </button>

            <button className="cards">
              <div>
                <img src="" />
                <h2>Today Income</h2>
              </div>
              <div>{todayIncome}</div>
            </button>

            <button className="cards">
              <div>
                <img src="" />
                <h2>Card Payments</h2>
              </div>
              <div>{cardPayments}</div>
            </button>

            <button className="cards">
              <div>
                <img src="" />
                <h2>Cash Payments</h2>
              </div>
              <div>{cashPayments}</div>
            </button>
          </div>
        </section>
        <h1>All incomes</h1>
        <section className="body">
        
         
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>date</th>
                    <th>Payment Methode</th>
                    <th>Amount</th>
                    
                    
                  </tr>
                </thead>
                <tbody>
                {
                    income.map((income)=>{
                        return(
                            <tr>
                            <td>{format(parseISO(income.date),'yyyy-MM-dd')}</td>
                            <td>{income.paymentMethod}</td>
                            <td>{income.amount}</td>
                           
                           
                          </tr>
                        )
                    })
                }
                 
                  
                </tbody>
              </Table>
           
        
        </section>
      </section>
    </div>
  );
}
