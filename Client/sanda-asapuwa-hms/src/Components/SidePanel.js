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
    const render=()=>{
        if(position==="Manager") {
               return(
                <>
                <Link to={`/Manager/${id}`}> <button className="side-btn-room" onClick={(e)=>{handleClickEvents(e)}}>Dasboard</button></Link>
               <Link to={`/Rooms/${id}`}> <button className="side-btn-room" onClick={(e)=>{handleClickEvents(e)}}>Rooms</button></Link>
               <Link to={`/Staff/${id}`}> <button className="side-btn-room" onClick={()=>{setisVisited(!isVisited)}}>Staff</button></Link>
               <Link to={`/Booking/${id}`}> <button className="side-btn-room" onClick={()=>{setisVisited(!isVisited)}}>Bookings</button></Link>
               <Link to={`/Income/${id}`}> <button className="side-btn-room" onClick={()=>{setisVisited(!isVisited)}}>Income</button></Link>
               <Link to={`/Settings/${id}`}> <button className= "side-btn-room" onClick={()=>{setisVisited(!isVisited)}}>Account Settings</button></Link>
                </>
               )
        }
        else if(position==="Reception"){
            return(
                <>
                 <Link to={`/Reception/${id}`}> <button className="side-btn-room" onClick={(e)=>{handleClickEvents(e)}}>Dasboard</button></Link>
                <Link to={`/Rooms-r/${id}`}> <button className="side-btn-room" onClick={(e)=>{handleClickEvents(e)}}>Rooms</button></Link>
                <Link to={`/Staff-r/${id}`}> <button className="side-btn-room" onClick={()=>{setisVisited(!isVisited)}}>Staff</button></Link>
                <Link to={`/Booking-r/${id}`}> <button className="side-btn-room" onClick={()=>{setisVisited(!isVisited)}}>Bookings</button></Link>
                <Link to={`/Income-r/${id}`}> <button className="side-btn-room" onClick={()=>{setisVisited(!isVisited)}}>Income</button></Link>
                <Link to={`/Settings-r/${id}`}> <button className= "side-btn-room" onClick={()=>{setisVisited(!isVisited)}}>Account Settings</button></Link>
                 </>
            )
        }
        else {
            return(
                <>
                 <Link to={`/Admin/${id}`}> <button className="side-btn-room" onClick={(e)=>{handleClickEvents(e)}}>Dasboard</button></Link>
                <Link to={`/RoomsA/${id}`}> <button className="side-btn-room" onClick={(e)=>{handleClickEvents(e)}}>Rooms</button></Link>
                <Link to={`/StaffA/${id}`}> <button className="side-btn-room" onClick={()=>{setisVisited(!isVisited)}}>Staff</button></Link>
                <Link to={`/BookingA/${id}`}> <button className="side-btn-room" onClick={()=>{setisVisited(!isVisited)}}>Bookings</button></Link>
                <Link to={`/IncomeA/${id}`}> <button className="side-btn-room" onClick={()=>{setisVisited(!isVisited)}}>Income</button></Link>
                <Link to={`/SettingsA/${id}`}> <button className= "side-btn-room" onClick={()=>{setisVisited(!isVisited)}}>Account Settings</button></Link>
                 </>
            )
        }
                 
            
            
    
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

                {render()}
                <div> <img src={Logo}/></div>
            </section>
            
        </div>
        
    )
}