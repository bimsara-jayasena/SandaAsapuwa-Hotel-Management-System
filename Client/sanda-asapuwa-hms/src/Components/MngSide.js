import React from "react";
import '../StyleSheets/manager.css';
import {Link} from 'react-router-dom';
export default function MngSide(){
    return(
        <div className="body">
            <section className="side-panel">
                <Link to="/Rooms"> <button className="side-btn-room">Rooms</button></Link>
                <button className="side-btn-room">Rooms</button>
                <button className="side-btn-room">Rooms</button>
                <button className="side-btn-room">Rooms</button>
            </section>
           
        </div>
        
    )
}