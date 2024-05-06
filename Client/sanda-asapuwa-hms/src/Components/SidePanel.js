import React, { useState } from "react";
import '../StyleSheets/sidepanel.css';
import {Link} from 'react-router-dom';
import Logo from '../Resources/icons8-lotus-64-white.png'
export default function SidePanel({id,firstName,lastName, position,profile} ){
    const [isVisited,setisVisited]=useState(false);
    const handleClickEvents=(event)=>{
        const classname=event.target.className;
        
        setisVisited(!isVisited);
    }
    return(
        <div className="side-panel-body">
            <section className="side-panel">
                <div className="side-panel-header">
                    <Link to='/Manager'><img src="" alt="profile-image"/></Link>
                    <div>
                    <h3>{firstName+' '+lastName}</h3>
                    <h4>{position}</h4>
                    </div>
                </div>

                {position==="Manager" ? 
                 <>
                 <Link to={`/Manager/${id}`}> <button className="side-btn-room" onClick={(e)=>{handleClickEvents(e)}}>Dasboard</button></Link>
                <Link to={`/Rooms/${id}`}> <button className="side-btn-room" onClick={(e)=>{handleClickEvents(e)}}>Rooms</button></Link>
                <Link to={`/Staff/${id}`}> <button className="side-btn-room" onClick={()=>{setisVisited(!isVisited)}}>Staff</button></Link>
                <Link to={`/Booking/${id}`}> <button className="side-btn-room" onClick={()=>{setisVisited(!isVisited)}}>Bookings</button></Link>
                <Link to={`/Settings/${id}`}> <button className= "side-btn-room" onClick={()=>{setisVisited(!isVisited)}}>Account Settings</button></Link>
                 </>
                 :
                 <>
                 <Link to={`/Reception/${id}`}> <button className="side-btn-room" onClick={(e)=>{handleClickEvents(e)}}>Dasboard</button></Link>
                <Link to={`/Rooms-r/${id}`}> <button className="side-btn-room" onClick={(e)=>{handleClickEvents(e)}}>Rooms</button></Link>
                <Link to={`/Staff-r/${id}`}> <button className="side-btn-room" onClick={()=>{setisVisited(!isVisited)}}>Staff</button></Link>
                <Link to={`/Booking-r/${id}`}> <button className="side-btn-room" onClick={()=>{setisVisited(!isVisited)}}>Bookings</button></Link>
                <Link to={`/Settings-r/${id}`}> <button className= "side-btn-room" onClick={()=>{setisVisited(!isVisited)}}>Account Settings</button></Link>
                 </>
            
            
    }
                <div> <img src={Logo}/></div>
            </section>
            
        </div>
        
    )
}