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
                <h2>Income</h2>
              </div>
              <div>$2000</div>
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
            <Scrollpane>
              <div className="table">
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Reservation Id</th>
                      <th>Room</th>
                      <th>Guest Name</th>
                      <th>Total Guest</th>
                      <th>Arrival Date</th>
                      <th>Departure Date</th>
                      <th>Days staying</th>
                      <th>Payed amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>1</td>
                      <td>Mark</td>
                      <td>4</td>
                      <td>01.05.24</td>
                      <td>14.05.24</td>
                      <td>5</td>
                      <td>$500</td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>1</td>
                      <td>Jacob</td>
                      <td>1</td>
                      <td>02.05.24</td>
                      <td>6.05.24</td>
                      <td>4</td>
                      <td>$30</td>
                    </tr>
                    <tr>
                      <td>3</td>
                      <td>1</td>
                      <td>Larry the Bird</td>
                      <td>2</td>
                      <td>03.05.24</td>
                      <td>7.05.24</td>
                      <td>4</td>
                      <td>$50</td>
                    </tr>
                  </tbody>
                </Table>
              </div>
            </Scrollpane>
          </div> 
           
           
         
        
         
        </section>
      </section>
    </div>
  );
}
