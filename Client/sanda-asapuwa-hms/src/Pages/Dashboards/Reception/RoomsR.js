import React, { useEffect, useState } from "react";
import '../../../StyleSheets/manager.css';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SidePanel from '../../../Components/SidePanel';
import UPDATE from '../../../Components/UpdateRoom';
import ADD from '../../../Components/AddRoom';
import DELETE from '../../../Components/DeleteRoom';
import ScrollPane from "../../../Components/Scrollpane";
import Logo from '../../..//Resources/icons8-lotus-64-white.png';
import axios from 'axios';
import  Button  from "react-bootstrap/Button";
import { useParams } from "react-router-dom";
import {ClipLoader} from  'react-spinners';
import { MDBContainer } from "mdb-react-ui-kit";
;
export default function RoomsR(){
   
    const [rooms,setRooms]=useState([]);
    const [roomCount,setRoomCount]=useState(0);
    const [availableRoomCount,setAvailableRoomCount]=useState(0);
    const [booked,setBooked]=useState(0);
    const[isclicked,setisClicked]=useState(false);
    const[crudAction,setCrudAction]=useState("");
    const[roomId,setRoomId]=useState("");
    const [info,setInfo]=useState("all");
    const {id}=useParams();
    const[firstName,setFirstName]=useState("");
    const[lastName,setLastName]=useState("");
    const[position,setPosition]=useState("");
    const[profile,setProfile]=useState("");
    const[loadingPage,setLoadingPage]=useState(true);
    const[loading,setLoading]=useState(true);

    useEffect(()=>{
        axios.get(`http://localhost:8080/Employes/empid/${id}`)
        .then((res)=>{
            setFirstName(res.data.firstName);
            setLastName(res.data.lastName);
            setPosition(res.data.position);
            setProfile(res.data.profileImg);
            setLoadingPage(false);
        })
        .catch((err)=>console.log(err.response));
    },[]);
    const upRoom=(event)=>{
        setisClicked(true);
       
        console.log(`updated ID: ${event.target.id}`);
        setCrudAction(event.target.value);
        setRoomId(event.target.id);
      
    }
    const delRoom=(event)=>{
        setisClicked(!isclicked);
        setCrudAction(event.target.value);
        setRoomId(event.target.id);
    }
    const addRoom=(event)=>{
        setisClicked(!isclicked);
        console.log(isclicked);
        setCrudAction(event.target.value);
        setRoomId(event.target.id);
    }
    const close=()=>{setisClicked(false)}

    useEffect(()=>{
        axios.get("http://localhost:8080/Rooms")
        .then((res)=>{
            setRooms(res.data);
            setLoading(false);
        })
        .catch((err)=>console.log({message:err.message})
        );
     },[rooms]);

    useEffect(()=>{
        let roomCount=0;
        let availableRoomCount=0;
        let booked=0;
        rooms.map((room)=>{
            roomCount++;
            if(room.availability==="available"){
                availableRoomCount++
            }
            else{
                booked++
            }
        })
        setRoomCount(roomCount);
        setAvailableRoomCount(availableRoomCount)
        setBooked(booked);
    },[rooms]);
    return(
        
       <div>
         {loadingPage ? <div className="loading-screen-container">
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
            
            <section className={isclicked ? "navigation blur" : "navigation "}>
            <SidePanel id={id} firstName={firstName} lastName={lastName} position={position} profile={profile}/>
            </section>
           
            <section className={isclicked ? "body-panel blur" : "body-panel "}>
               
                <h1>Rooms information</h1>
                
                    <div className="card-container">
                        <button className="cards" onClick={()=>{setInfo("all")}}>
                            <div>
                                <img src={Logo}/>
                                <h2>Total Rooms</h2>
                            </div>
                            <div>{roomCount}</div>
                        </button>
       
                        <button className="cards" onClick={()=>{setInfo("booked")}}>
                            <div>
                                <img src={Logo}/>
                                <h2>Booked Rooms</h2>
                            </div>
                            <div>{booked}</div>
                        </button>
        
                        <button className="cards" onClick={()=>{setInfo("available")}}>
                            <div>
                                <img src={Logo}/>
                                <h2>Available Rooms</h2>
                            </div>
                            <div>{availableRoomCount}</div>
                         </button>
                    </div>
                    <div className="search-bar">
                      
                    </div>

                    <div className="scrollpane-container">
                        <div >
                        {loading ? <div className="loading-screen-container-scrollpane">
                            <div className="loading-screen-scrollpane"></div>
                            <ClipLoader
                                    color="dodgerblue"
                                    loading={true}
                                    size={150}
                                    aria-label="Loading Spinner"
                                    data-testid="loader"
                                    className="loading-spinner"
                                />
                            </div>:<></>}
                            </div>
                        <ScrollPane>
                           
                            {/*  
                             */}
                             {
                               info==="all" ? 
                               <>
                               {rooms.map((room)=>{
                                    return(
                                            <div>
                                                <div className="crud-container">
                                                    <div className="crud-img">
                                                    <img src="" alt={room.images}/>
                                                    </div>
                                                    <div className="crud-info">
                                                        Room status: {room.availability}<br/>
                                                        Room Price:
                    
                                                   
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    }
                                    )
                             }
                               
                               </>:<></>
                                
                             }
                              {
                               info==="booked" ? 
                               <>
                                 {rooms.map((room)=>{
                                    if(room.availability==="not available")
                                    return(
                                            <div>
                                                <div className="crud-container">
                                                    <div className="crud-img">
                                                    <img src="" alt={room.images}/>
                                                    </div>
                                                    <div className="crud-info">
                                                        Room status: {room.availability}<br/>
                                                        Room Price:
                    
                                                   
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    }
                                    )
                             }
                               </>:<></>
                                
                             }
                              {
                               info==="available" ?
                               <>
                               {rooms.map((room)=>{
                                  if(room.availability==="available")
                                  return(
                                          <div>
                                              <div className="crud-container">
                                                  <div className="crud-img">
                                                  <img src="" alt={room.images}/>
                                                  </div>
                                                  <div className="crud-info">
                                                      Room status: {room.availability}<br/>
                                                      Room Price:
                  
                                                 
                                                  </div>
                                              </div>
                                          </div>
                                      )
                                  }
                                  )
                           }
                             </>:<></>
                                
                             }
                           
                        </ScrollPane>
                        
                       
                    </div>
                   

               
            </section>
            <div className={isclicked ? "crud-alert-container zindex-on" : "crud-alert-container "}>
               <div className={isclicked ? "crud-alert display-block" : "crud-alert display-none"}>
                    <div className="btn-close-container">
                        <button className="close-button" onClick={close}>Close</button></div>
                    <div className="alert-container">
                        {
                           (()=>{
                            if(crudAction==="ADD"){return(<ADD/>)}
                            else if(crudAction==="UPDATE"){return(<UPDATE roomId={roomId}/>)}
                            else if(crudAction==="DELETE"){return(<DELETE roomId={roomId} mngId={id}/>)}
                            
                        
                        })()
                        }
                        
                    </div>
                </div>
               </div>

        </div>
        <ToastContainer/>
       </div>
    )
}