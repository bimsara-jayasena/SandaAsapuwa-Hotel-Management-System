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
export default function Bookings() {
  const { id } = useParams();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [position, setPosition] = useState("");
  const [profile, setProfile] = useState("");
  const [loading, setLoading] = useState(true);
  const [account,setAccount]=useState();
  useEffect(() => {
    axios
      .get(`http://localhost:8080/Employes/empid/${id}`)
      .then((res) => {
        setAccount(res.data);
        setFirstName(res.data.firstName);
        setLastName(res.data.lastName);
        setPosition(res.data.position);
        setProfile(res.data.profileImg);
      })
      .catch((err) => console.log(err.response));
  });
  const click=()=>{
    alert("clicked");
  }

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
         Account information
        
         

          
            <div className="table-container">
              <div className="table">
                <Table striped bordered hover>
                 
                  <tbody>
                    <tr>
                      <th>Employee Id</th>
                        <th>{account.employeId}</th>
                    </tr>
                    <tr>
                        <th>First Name</th>
                        <th>{account.firstName}</th>
                    </tr>
                    <tr>
                      <th>lastName</th>
                        <th>{account.lastName}</th>
                    </tr>
                    <tr>
                        <th>Address</th>
                        <th>{account.address}</th>
                    </tr>
                    <tr>
                      <th>E-Mail </th>
                        <th>{account.eMail}</th>
                    </tr>
                    <tr>
                        <th>Contact No</th>
                        <th>{account.contactNo}</th>
                    </tr>
                    
                  </tbody>
                  

                </Table>
              </div>
           
          </div> 

           
           
         
        
         
        </section>
      </section>
    </div>
  );
}
