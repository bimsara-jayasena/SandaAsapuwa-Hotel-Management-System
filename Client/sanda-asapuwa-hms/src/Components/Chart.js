import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import {Chart as ChartJs,CategoryScale,LinearScale,PointElement,LineElement,Tooltip,Legend} from 'chart.js'
import { Line } from "react-chartjs-2";
import {format,startOfDay,parseISO} from 'date-fns';
export default function Chart(){
    const [xAxis,setXaxis]=useState([]);
    const [yAxis,setYaxis]=useState([]);
    const [counts,setCounts]=useState([]);
    ChartJs.register(CategoryScale,LinearScale,PointElement,LineElement,Tooltip,Legend);
    
    /*get booking counts  */
    const countsRef=useRef(counts);
    useEffect(()=>{
        countsRef.current=counts;
    },[counts]);
    
    useEffect(()=>{
       const interval=setInterval(()=>{
        axios.get('http://localhost:8080/Counts')
        .then((res)=>{
           if(JSON.stringify(countsRef.current)!==JSON.stringify(res.data)){
                setCounts(res.data);
                
           }
        })
        .catch((err)=>{console.log(err)})
       },1000)
       return ()=>clearInterval(interval);
    },[])
  
    /* Draw Chart */

    /* Get X,Y axis values according to time spans */
    const getValuesByTimePeriode=()=>{
        const group={};
        let date;
        counts.forEach((element)=>{
            date=format(startOfDay(parseISO(element.date)),'yyyy-MM-dd');
            if(!group[date]){
                group[date]=0;
            }
            group[date]=+element.count;
        })
        return group;
    }
    useEffect(()=>{
        const x=getValuesByTimePeriode();
        setXaxis(Object.keys(x));
    },[counts])
    useEffect(()=>{
        const y=getValuesByTimePeriode();
        setYaxis(Object.values(y));
    },[counts])
   
    const data={
        labels:xAxis,
        datasets:[{
            label:"days",
            data:yAxis,
            borderColor:"dodgerblue",
           
        }]
    }
    return(
        <div>
           
            <Line data={data}/>
        </div>
    )

}