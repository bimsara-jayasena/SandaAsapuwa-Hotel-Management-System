
import React, { useEffect, useRef, useState } from "react";
import {Link, redirect, useFetcher, useNavigate} from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { Alert } from "react-bootstrap";
import {Form } from "react-bootstrap";
import '../StyleSheets/Home.css';
import Logo from '../Resources/sanda.jpg';
import axios from "axios";
import { faL } from "@fortawesome/free-solid-svg-icons";


export default function Home(){
    
    const[validated,setValidated]=useState(false);
    const[loaded,setLoaded]=useState(false);
    const[user,setUser]=useState("");
    const[empId,setEmpid]=useState("");
    const[empPw,setEmpPw]=useState("");
    const [validId,setValidId]=useState(true);
    const [validPw,setValidPw]=useState(true);
    const[idErr,setIdErr]=useState(false);
    const[pwErr,setPwErr]=useState(false);
    const navigate = useNavigate();
   
    useEffect(()=>{
        setLoaded(true);
        axios.get(`http://localhost:8080/Employes/empid/${empId}`)
        .then((res)=>{
            
           setValidId(true)
          
           setValidPw (res.data.password===empPw);
          
            if(res.data.password===empPw){
                
                console.log('correct pw');
            }
            console.log('correct id');
            setUser(res.data.position);
        })
        .catch((err)=>
        {
            console.log(err.response);
            setValidId(false);
        })


    },[empId])
    useEffect(()=>{
        setLoaded(true);
        axios.get(`http://localhost:8080/Employes/empid/${empId}`)
        .then((res)=>{
            
          
          
           setValidPw (res.data.password===empPw);
          
            if(res.data.password===empPw){
                
                console.log('correct pw');
            }
            console.log('correct id');
         
        })
        .catch((err)=>
        {
            console.log(err.response);
            setValidId(false);
        })


    },[empPw])
    
    const handleSubmit = (event) => {
        event.preventDefault();

       

        const form = event.currentTarget;
        
        if (form.checkValidity() === false) {
          console.log("empty")
          event.stopPropagation();
        }
        else if(!validId){
            setIdErr(true);
            console.log("invalid id");
            event.stopPropagation();
        }
        else if(!validPw){
            setPwErr(true)
            console.log("invalid password");
            event.stopPropagation();
        }
        else{
            setIdErr(false);
            setPwErr(false);
            navigate(`/${user}/${empId}`);
        }
        setValidated(true);
      };
      
      const show=()=>{
        console.log(`ID->${empId}`)
        
      }
    return(
        <div>
            <section className="Body">
                <div className="home-logo">
                    <img src={Logo}/>
                </div>
               <h1 className="color-white">Sanda Asapuwa Home Stay</h1>
               {idErr ? 
                    <Alert variant="danger"  dismissible>
                     <Alert.Heading>Oh snap! Invalid Employe ID!</Alert.Heading>
                    </Alert> : <></>
                }
                {pwErr ? 
                    <Alert variant="danger"  dismissible>
                     <Alert.Heading>Oh snap! Incorrect Password!</Alert.Heading>
                    </Alert> : <></>} 
                       
                <div className="container">
                <div className="form-container">
              
              <Form noValidate validated={validated} onSubmit={handleSubmit}>
                  <Form.Group>
                      <Form.Label controlId="floatingInput" label="user Id"/>
                      <Form.Control type="text" placeholder="Employe ID" autoComplete="true" onChange={(e)=>setEmpid(e.target.value)} required/>
                      <Form.Control.Feedback type="invalid" className="bold">Enter Correct Employee Id</Form.Control.Feedback>
                    
                  </Form.Group>

                  <Form.Group>
                      <Form.Label controlId="floatingInput" label="user pw"/>
                      <Form.Control type="password" placeholder="Password" onChange={(e)=>setEmpPw(e.target.value)} required/>
                      <Form.Control.Feedback type="invalid" className="bold">Enter Correct Password</Form.Control.Feedback>
                    
                  </Form.Group>
                {loaded ?  <Button type="submit" > Log in</Button> :  <Button type="submit" disabled> Log in</Button>}
              </Form>
             
                 
              </div>
              
              <Button ><Link to='/New Account' className="link" >Create new account</Link></Button>
             
           
                    </div>  
            </section>
            <Button onClick={show}>click</Button>
          
      
        </div>
    )
}