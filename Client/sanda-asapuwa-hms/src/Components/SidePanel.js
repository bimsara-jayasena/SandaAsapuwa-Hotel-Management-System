import React, { useState } from "react";
import '../StyleSheets/sidepanel.css';
import {Link} from 'react-router-dom';
import Logo from '../Resources/icons8-lotus-64-white.png'
export default function SidePanel(){
    const [isVisited,setisVisited]=useState(false);
    const handleClickEvents=(event)=>{
        const classname=event.target.className;
        
        setisVisited(!isVisited);
    }
    return(
        <div className="side-panel-body">
            <section className="side-panel">
                <div className="side-panel-header">
                    <img src={Logo}/>
                    <div>
                    <h2>User Name</h2>
                    <h3>user position</h3>
                    </div>
                </div>
               
                <Link to="/Rooms"> <button className="side-btn-room" onClick={(e)=>{handleClickEvents(e)}}>Rooms</button></Link>
                <Link to="/Staff"> <button className="side-btn-room" onClick={()=>{setisVisited(!isVisited)}}>Staff</button></Link>
                <Link to="/Booking"> <button className="side-btn-room" onClick={()=>{setisVisited(!isVisited)}}>Bookings</button></Link>
                <Link to="/Account"> <button className= "side-btn-room" onClick={()=>{setisVisited(!isVisited)}}>Account Settings</button></Link>
                <div> <img src={Logo}/></div>
            </section>
            
        </div>
        
    )
}