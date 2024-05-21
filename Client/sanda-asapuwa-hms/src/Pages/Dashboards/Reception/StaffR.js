import React from "react";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import SidePanel from "../../../Components/SidePanel";
import Logo from "../../../Resources/icons8-lotus-64-white.png";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Scrollpane from "../../../Components/Scrollpane";
import AddEmploye from "../../../Components/AddEmploye";
import Abscene from "../../../Components/Abscene";
import EmployeInfo from "../../../Components/EmployeInfo";
import { ClipLoader } from "react-spinners";
import { Alert } from "react-bootstrap";
import UpdateEmploye from "../../../Components/UpdateEmploye";
export default function StaffR() {
  
  const { id } = useParams();
  const [empId, setEmpId] = useState("");
  const [empCount,setEmpCount]=useState(0);
  const [employes, setEmployes] = useState([]);
  const [employe, setEmploye] = useState();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [position, setPosition] = useState("");
  const [profile, setProfile] = useState("");
  const [loading, setLoading] = useState(true);
  const [clicked, setClicked] = useState(false);
  const [showAb, setShowAb] = useState(false);
  const [showEmp, setShowEmp] = useState(false);
  const [allowUpdate, setAllowUpdate] = useState(false);

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
        const arr=res.data.filter(element=>element.position!=='Admin');
        setEmployes(arr);
        

      })
      .catch((err) => console.log(err.response));
  }, [employes]);

  useEffect(()=>{
    let empCount=0;
      employes.map((emp)=>{
        empCount++;
      })
      setEmpCount(empCount);
  },[employes])

  const click = (iD) => {
      setShowEmp(true);
    setEmpId(iD);
    axios
      .get(`http://localhost:8080/Employes/empid/${iD}`)
      .then((res) => {
        setEmploye(res.data);
      })
      .catch((err) => console.log(err.response));
  };
  const showAbscense = () => {
    setShowAb(true);
  };
  const close = () => {
    setClicked(false);
    setShowAb(false);
    setShowEmp(false);
    setAllowUpdate(false);
  };
 

  const render=()=>{
    return(
      <div>
      <section className="body">
        <section className="header">
          <SidePanel
            id={id}
            firstName={firstName}
            lastName={lastName}
            position={position}
            profile={""}
          />
        </section>
        <section className="body-panel">
          Staff information
          <div className="card-container align-items-center">
            <div className="cards">
              <div>
                <img src={Logo} />
                <h2>Total Employees</h2>
              </div>
              <div>{empCount}</div>
            </div>

            <button className="cards" onClick={() => setShowAb(true)}>
              <div>
                <img src={Logo} />
                <h2>Abscens</h2>
              </div>
              <div>2</div>
            </button>
          </div>
          <div className="search-bar">
            <input type="text" placeholder="Search here..." />
          </div>
          <div className="scrollpane-container">
            {/* <div>
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
            </div> */}
            <Scrollpane>
              <div className="table">
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Employee Id</th>
                      <th>Name</th>
                      <th>position</th>
                      
                      <th>Contact No</th>
                      <th>availability</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {employes.map((employe) => {
                      return (
                        <tr
                          onClick={() => {
                            click(employe.empId);
                          }}
                        >
                          <td>{employe.empId}</td>
                          <td>
                            {employe.firstName} {employe.lastName}
                          </td>
                          <td>{employe.position}</td>
                          
                          <td>{employe.contactNo}</td>
                          <td>available</td>
                          
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </div>
            </Scrollpane>
           
           
          </div>
        </section>
        <div
          className={
            showAb ? "crud-alert-container zindex-on" : "crud-alert-container "
          }
        >
          <div
            className={
              showAb ? "crud-alert display-block" : "crud-alert display-none"
            }
          >
            <div className="btn-close-container">
              <button className="close-button" onClick={close}>
                Close
              </button>
            </div>
            <div className="alert-container">
              {(() => {
                {
                  return <Abscene />;
                }
              })()}
            </div>
          </div>
        </div>

        {/* Alerts */}

        

        {/* EMPLOYE DETAILS */}
        <div
          className={
            showEmp ? "crud-alert-container zindex-on" : "crud-alert-container "
          }
        >
          <div
            className={
              showEmp ? "crud-alert display-block" : "crud-alert display-none"
            }
          >
            <div className="btn-close-container">
              <button className="close-button" onClick={close}>
                Close
              </button>
            </div>
            <div className="alert-container">
              {!employe ? (
                <></>
              ) : (
                <>
                  {(() => {
                    {
                      return (
                        <EmployeInfo
                          image={employe.profileImg}
                          employeId={employe.empId}
                          firstName={employe.firstName}
                          lastName={employe.lastName}
                          position={employe.position}
                          email={employe.eMail}
                          address={employe.address}
                          contactNo={employe.contactNo}
                         
                        />
                      );
                    }
                  })()}
                </>
              )}
              
            </div>
          </div>
        </div>

        
      </section>
      <ToastContainer/>
    </div>
    )
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
