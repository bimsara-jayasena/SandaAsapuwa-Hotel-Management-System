import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Table  from "react-bootstrap/Table";
import { ToastContainer, toast } from "react-toastify";
import '../StyleSheets/manager.css'
export default function Test() {
  
  const showToastMessage = () => {
    toast.error("Success Notification !",{
      position: "bottom-right"
    });
  };
  return (
    <div>
      <div className="test-container">
      <button onClick={showToastMessage}>Notify</button>
      </div>
      
      <ToastContainer />
    </div>
  );
}
