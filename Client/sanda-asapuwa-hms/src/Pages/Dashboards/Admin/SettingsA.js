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
          
              <div className="table">
                <Table striped bordered hover>
                 
                  <tbody>
                    <tr>
                      <th>Employee Id</th>
                        <th>1</th>
                    </tr>
                    <tr>
                        <th>First Name</th>
                        <th>mark</th>
                    </tr>
                    <tr>
                      <th>lastName</th>
                        <th>ff</th>
                    </tr>
                    <tr>
                        <th>Address</th>
                        <th>1</th>
                    </tr>
                    <tr>
                      <th>E-Mail </th>
                        <th>1</th>
                    </tr>
                    <tr>
                        <th>Contact No</th>
                        <th>1</th>
                    </tr>
                    <tr>
                        <th>Password</th>
                        <th>1</th>
                    </tr>
                  </tbody>
                  

                </Table>
              </div>
            <Button variant="danger">Remove Account</Button>
            <Button >Update Account</Button>
          </div> 

           
           
         
        
         
        </section>
      </section>
    </div>
  );
}
