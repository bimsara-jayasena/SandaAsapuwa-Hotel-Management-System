import React, { useEffect } from "react";
import { useState } from "react";
import "./CRUD.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Form, InputGroup, Table } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Alert from 'react-bootstrap/Alert';
import Logo from "../Resources/icons8-lotus-64-white.png";
import axios from "axios";
import { faL } from "@fortawesome/free-solid-svg-icons";
export default function UpdateEmploye({ employeId }) {
  const [validated, setValidated] = useState(false);
  const [removed, setRemoved] = useState(false);
  const [employe, setEmploye] = useState(null);
  const [newImage, setNewImage] = useState();
  const [newfirstName, setNewFirstName] = useState();
  const [newlastName, setNewLastName] = useState();
  const [newposition, setNewPosition] = useState();
  const [newemail, setNewEmail] = useState();
  const [newAddress, setNewAddress] = useState();
  const [newContactNo, setNewContactNo] = useState();
  const [newPassword, setNewPassword] = useState();
  const [availability,setAvailability]=useState("");
  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  useEffect(() => {
    axios
      .get(`http://localhost:8080/Employes/empid/${employeId}`)
      .then((res) => {
        setEmploye(res.data);
        setNewImage(res.data.profileImg);
        setNewFirstName(res.data.firstName);
        setNewLastName(res.data.lastName);
        setNewPosition(res.data.position);
        setNewEmail(res.data.eMail);
        setNewAddress(res.data.address);
        setNewContactNo(res.data.contactNo);
        setNewPassword(res.data.password);
        setAvailability(res.data.availability);
        console.log(res.data);
      })
      .catch((err) => console.log({ message: err.message }));
  }, [employeId]);

  const btnUpdateClicked = () => {
    const formData = new FormData();
    formData.append("profile-image", newImage);
    formData.append("firstName", newfirstName);
    formData.append("lastName", newlastName);
    formData.append("eMail", newemail);
    formData.append("address", newAddress);
    formData.append("contactNo", newContactNo);
    formData.append("position", newposition);
    formData.append("password", newPassword);
    formData.append("availability",availability);
    axios
      .patch(
        `http://localhost:8080/Employes/update-employe/patch/${employeId}`,formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
        
      )
      .then((res) =>
        {
          console.log(`Employe ${res.data.firstName}'s details updated `);
          toast.success(`Employe ${res.data.firstName}'s details updated `);
        }
      )
      .catch((err) => console.log(err));
  };

  return (
    <div
      className={
        !removed
          ? "crud-body crud-display-block  "
          : "crud-body crud-display-none  "
      }
    > 
       
      <h1>Update Employe</h1>
      
      <div className="logo">
        {" "}
        <img src={Logo} />
      </div>
      <div className="crud-form-container crud-display-block  ">
        <div>
          <img src="" alt="profile-image" />
          <input
            type="text"
            className="update-form"
            value={newImage}
            onChange={(e) => {
              setNewImage(e.target.value);
            }}
          />
          <Table className="custom" striped bordered hover variant="primary">
            <tbody>
              <tr>
                <th>Employee Id</th>
                <th>{employeId}</th>
              </tr>

              <tr>
                <th> First Name</th>
                <th>
                  <input
                    type="text"
                    className="update-form"
                    value={newfirstName}
                    onChange={(e) => {
                      setNewFirstName(e.target.value);
                    }}
                  />
                </th>
              </tr>
              <tr>
                <th> Last Name</th>
                <th>
                  <input
                    type="text"
                    className="update-form"
                    value={newlastName}
                    onChange={(e) => {
                      setNewLastName(e.target.value);
                    }}
                  />
                </th>
              </tr>
              <tr>
                <th>position</th>
                <th>
                  <input
                    type="text"
                    className="update-form"
                    value={newposition}
                    onChange={(e) => {
                      setNewPosition(e.target.value);
                    }}
                  />
                </th>
              </tr>
              <tr>
                <th>Address</th>
                <th>
                  <input
                    type="text"
                    className="update-form"
                    value={newAddress}
                    onChange={(e) => {
                      setNewAddress(e.target.value);
                    }}
                  />
                </th>
              </tr>
              <tr>
                <th>E-Mail </th>
                <th>
                  <input
                    type="text"
                    className="update-form"
                    value={newemail}
                    onChange={(e) => {
                      setNewEmail(e.target.value);
                    }}
                  />
                </th>
              </tr>
              <tr>
                <th>Contact No</th>
                <th>
                  <input
                    type="text"
                    className="update-form"
                    value={newContactNo}
                    onChange={(e) => {
                      setNewContactNo(e.target.value);
                    }}
                  />
                </th>
              </tr>
              <tr>
                <th>password</th>
                <th>
                  <input
                    type="text"
                    className="update-form"
                    value={newPassword}
                    onChange={(e) => {
                      setNewPassword(e.target.value);
                    }}
                  />
                </th>
              </tr>
              
             
            </tbody>
          </Table>
          <Button onClick={btnUpdateClicked}>Update</Button>
          
        </div>
      </div>
      {/*  <Button onClick={btnUpdateClicked}>Update</Button> */}
      
    </div>
  );
}
