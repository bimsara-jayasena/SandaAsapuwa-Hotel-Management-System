import React, { Component, useEffect, useState } from "react";
import '../../../StyleSheets/manager.css';
import MngSide from "../../../Components/MngSide";
import UPDATE from '../../../Components/Update';
import ADD from '../../../Components/Add';
import DELETE from '../../../Components/Delete';
import ScrollPane from "../../../Components/Scrollpane";
import axios from 'axios';
import  Button  from "react-bootstrap/Button";

export default function Rooms(){
    const [rooms,setRooms]=useState([]);
    const[isclicked,setisClicked]=useState(false);
    const[crudAction,setCrudAction]=useState("");
    const[roomId,setRoomId]=useState("");
   
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
            console.log(res.data)
        })
        .catch((err)=>console.log({message:err.message})
        );
       
    },[]);
    return(
        
        <div className="body">
           
            <section className={isclicked ? "navigation blur" : "navigation "}>
               <MngSide/>
            </section>
           
          
            <section className={isclicked ? "body-panel blur" : "body-panel "}>
            <h1>Rooms information</h1>
            
           <div className="scrollpane-container">
           <ScrollPane>
            {rooms.map((room)=>{
                    return(
                       <div>
                        <div className="card-container">
                            <div className="card-img">
                                <img src={room.url}/>
                            </div>
                            <div className="card-info">
                                Room status: {room.availability}
                    
                                <button id={room.roomId} className="btn-update" value="UPDATE"  onClick={(e)=>{upRoom(e)}}>Update</button>
                                <button id={room.roomId} className="btn-delete" value="DELETE" onClick={(e)=>{delRoom(e)}}>Delete</button>
                            </div>
                        </div>
                       </div>
                    )
                })}
            </ScrollPane>
            
           </div>
           <Button className="btnAdd" value="ADD" onClick={(e)=>{addRoom(e)}}>Add new Room</Button>
               
                 
                {/* <h2>Update Room</h2>
                <button className="btn-update" value="UPDATE"  onClick={(e)=>{upRoom(e)}}>Update</button>
                <h2>Delete Room</h2>
                
                <h2>Add Room</h2>
                <button className="btn-add" value="ADD" onClick={(e)=>{addRoom(e)}}>Add</button>
                <div className="crud-alert-container">
                    sss
                    
                </div> */}
              

                
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
                            else if(crudAction==="DELETE"){return(<DELETE roomId={roomId}/>)}
                            
                        
                        })()
                        }
                        
                    </div>
                </div>
               </div>

        </div>
        
    )
}