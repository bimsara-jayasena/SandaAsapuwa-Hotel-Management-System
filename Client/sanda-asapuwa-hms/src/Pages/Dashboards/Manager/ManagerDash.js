import React, { useEffect, useState } from "react";
import '../../../StyleSheets/manager.css';
import SidePanel from '../../../Components/SidePanel';
import Logo from '../../..//Resources/icons8-lotus-64-white.png';
import { useParams, useSearchParams } from "react-router-dom";
import {ClipLoader} from 'react-spinners';
import axios from "axios";

export default function ManagerDash(){
    let roomCount=0;
    let availableRoomCount=0;
    let booked=0;
    const {id} =useParams();
    
    const[firstName,setFirstName]=useState("");
    const[lastName,setLastName]=useState("");
    const[position,setPosition]=useState("");
    const[profile,setProfile]=useState("");
    const[loading,setLoading]=useState(true);

    useEffect(()=>{
        axios.get(`http://localhost:8080/Employes/empid/${id}`)
        .then((res)=>{
            setFirstName(res.data.firstName);
            setLastName(res.data.lastName);
            setPosition(res.data.position);
            setProfile(res.data.profileImg);
            setLoading(false);
        })
        .catch((err)=>console.log(err.response));
    })
  
    
   
    return(
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
            </div>:<></>}
            <div className="body">
            <SidePanel id={id} firstName={firstName} lastName={lastName} position={position} profile={profile}/>
            <section className="body-panel">
                <section className="header">
                <div className="card-container">
                        <div className="cards">
                            <div>
                                <img src={Logo}/>
                                <h2>Total Income</h2>
                            </div>
                            <div>{roomCount}</div>
                        </div>
       
                        <div className="cards">
                            <div>
                                <img src={Logo}/>
                                <h2>Booked Rooms</h2>
                            </div>
                            <div>{booked}</div>
                        </div>
        
                        <div className="cards">
                            <div>
                                <img src={Logo}/>
                                <h2>Guest Count</h2>
                            </div>
                            <div>{availableRoomCount}</div>
                         </div>

                         <div className="cards">
                            <div>
                                <img src={Logo}/>
                                <h2>Staff Count</h2>
                            </div>
                            <div>{availableRoomCount}</div>
                         </div>
                         <div className="cards">
                            <div>
                                <img src={Logo}/>
                                <h2>Reviews</h2>
                            </div>
                            <div>{availableRoomCount}</div>
                         </div>
                    </div>
                </section>
                this is boddy
            </section>
            </div>

        </div>
        
    )
}