import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import {
  Chart as ChartJs,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  elements,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { format, startOfDay, parseISO } from "date-fns";
export default function Chart({ startDate, endDate, timeSpan }) {
  const [xAxis, setXaxis] = useState([]);
  const [yAxis, setYaxis] = useState([]);
  const [counts, setCounts] = useState([]);

  /* For Monthly */
  const [startMonthCount, setStartMonthCount] = useState({});
  const [endMonthCount, setEndMonthCount] = useState({});
  const [monthlyCount, setMonthlyCount] = useState([null, null]);
  /* For Yearly */
  const [startYearCount, setStartYearCount] = useState({});
  const [endYearCount, setEndYearCount] = useState({});
  const [yearlyCount, setYearlyCount] = useState([null, null]);

  ChartJs.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend
  );

  /*get booking counts  */
  const countsRef = useRef(counts);
  useEffect(() => {
    countsRef.current = counts;
  }, [counts]);

  const startMonthCountrRef = useRef(startMonthCount);
  useEffect(() => {
    startMonthCountrRef.current = startMonthCount;
  }, [startMonthCount]);
  const endMonthCountrRef = useRef(endMonthCount);
  useEffect(() => {
    endMonthCountrRef.current = endMonthCount;
  }, [endMonthCount]);

  const startYearCountrRef = useRef(startYearCount);
  useEffect(() => {
    startYearCountrRef.current = startYearCount;
  }, [startYearCount]);
  const endYearCountrRef = useRef(endYearCount);
  useEffect(() => {
    endYearCountrRef.current = endYearCount;
  }, [endYearCount]);

  useEffect(() => {
    if (!startDate && !endDate) {
      startDate = "2024-05-01";
      endDate = "2024-06-01";
    } else {
      let startDateObject = new Date(startDate);
      let endDateObject = new Date(endDate);
      const startYear = startDateObject.getFullYear();
      const endYear = endDateObject.getFullYear();
      const startMonth = startDateObject.getMonth() + 1;
      const endMonth = endDateObject.getMonth() + 1;

      /* set counts */
      if (timeSpan === "year") {
        const startMonthCount = [];
        const endMonthCount = [];
        const interval = setInterval(() => {
          axios
            .get(
              `http://localhost:8080/Counts/totalBookingsForMonths/${startYear}/${startMonth}`
            )
            .then((res) => {
              const newEntry = { date: startMonth, count: res.data };
              if (
                JSON.stringify(startMonthCountrRef.current) !==
                JSON.stringify(newEntry)
              ) {
                setStartMonthCount(newEntry);
              }
            })
            .catch((err) => {
              console.log(err);
            });
          axios
            .get(
              `http://localhost:8080/Counts/totalBookingsForMonths/${startYear}/${endMonth}`
            )
            .then((res) => {
              const newEntry = { date: endMonth, count: res.data };
              if (
                JSON.stringify(endMonthCountrRef.current) !==
                JSON.stringify(newEntry)
              ) {
                setEndMonthCount(newEntry);
              }
            })
            .catch((err) => {
              console.log(err);
            });
        }, 1000);
        return () => clearInterval(interval);
      } else if (timeSpan === "decade") {
        const interval = setInterval(() => {
          /* Set Start year count */
          axios
            .get(
              `http://localhost:8080/Counts/totalBookingsForYear/${startYear}`
            )
            .then((res) => {
              const newEntry = { date: startYear, count: res.data };
              if (
                JSON.stringify(startYearCountrRef.current) !==
                JSON.stringify(newEntry)
              ) {
                setStartYearCount(newEntry);
              }
            })
            .catch((err) => {
              console.log(err);
            });
          /* Set End year count */
          axios
            .get(`http://localhost:8080/Counts/totalBookingsForYear/${endYear}`)
            .then((res) => {
              const newEntry = { date: endYear, count: res.data };
              if (
                JSON.stringify(endYearCountrRef.current) !==
                JSON.stringify(newEntry)
              ) {
                setEndYearCount(newEntry);
              }
            })
            .catch((err) => {
              console.log(err);
            });
        }, 1000);
        return () => clearInterval(interval);
      } else {
        const interval = setInterval(() => {
          axios
            .get(
              `http://localhost:8080/Counts/get-counts/${startDate}/${endDate}`
            )
            .then((res) => {
              if (
                JSON.stringify(countsRef.current) !== JSON.stringify(res.data)
              ) {
                setCounts(res.data);
              }
            })
            .catch((err) => {
              console.log(err);
            });
        }, 1000);
        return () => clearInterval(interval);
      }
    }
  }, [startDate, endDate]);
  useEffect(() => {}, []);

  /* get Monthly Counts */
  useEffect(() => {
    if (
      Object.keys(startMonthCount).length > 0 &&
      Object.keys(endMonthCount).length > 0
    ) {
      setMonthlyCount([startMonthCount, endMonthCount]);
    }
  }, [startMonthCount, endMonthCount]);
  useEffect(() => {
    console.log(monthlyCount);
    const isMonthlyCountNull = monthlyCount.some((element) => element === null);
    if (isMonthlyCountNull) {
      console.log("monthly count is null");
    } else {
      const dates = monthlyCount.map((element) => element.date);
      console.log(dates);
    }
  }, [monthlyCount]);

  /* Get Yearly Counts */
  useEffect(() => {
    if (
      Object.keys(startYearCount).length > 0 &&
      Object.keys(endYearCount).length > 0
    ) {
      setYearlyCount([startYearCount, endYearCount]);
    }
  }, [startYearCount, endYearCount]);
  /* Test yearly count */
  useEffect(() => {
    console.log(yearlyCount);
    const isYearlyCountNull = yearlyCount.some((element) => element === null);
    if (isYearlyCountNull) {
      console.log("yearly count is null");
    } else {
      const date = yearlyCount.map((element) => element.date);
      console.log("years:", date);
    }
  }, [yearlyCount]);

  /* Draw Chart */

  /* Get X,Y axis values according to time spans */
  const getValuesByTimePeriode = () => {
    if (timeSpan === "year") {
      const isMonthlyCountNull = monthlyCount.some(
        (element) => element === null
      );
      if (isMonthlyCountNull) {
        console.log("monthly count is null");
      } else {
        const group = {};
        let date;

        monthlyCount.forEach((element) => {
          date = element.date;
          if (!group[date]) {
            group[date] = 0;
          }
          group[date] = +element.count;
        });
        return group;
      }
    } else if (timeSpan === "decade") {
      const isYearlyCountNull = yearlyCount.some((element) => element === null);
      if (!isYearlyCountNull) {
        const group = {};
        let date;
        yearlyCount.forEach((element) => {
          date=element.date;
          if (!group[date]) {
            group[date] = 0;
          }
          group[date] = +element.count;
        });
        return group;
      }
    } else {
      const group = {};
      let date;
      counts.forEach((element) => {
        date = format(startOfDay(parseISO(element.date)), "yyyy-MM-dd");
        if (!group[date]) {
          group[date] = 0;
        }
        group[date] = +element.count;
      });
      return group;
    }
    /* counts.forEach((element)=>{
            date=format(startOfDay(parseISO(element.date)),'yyyy-MM-dd');
            if(!group[date]){
                group[date]=0;
            }
            group[date]=+element.count;
        })
        return group; */
  };
  /*  */
  useEffect(() => {
    if (timeSpan === "year" || timeSpan==="decade") {
      const x = getValuesByTimePeriode();
      if (x !== undefined) {
        setXaxis(Object.keys(x));
      }
    } 
   
    else {
      const x = getValuesByTimePeriode();
      setXaxis(Object.keys(x));
    }
  }, [monthlyCount,yearlyCount, counts, timeSpan]);
  useEffect(() => {
    if (timeSpan === "year" || timeSpan==="decade") {
      const y = getValuesByTimePeriode();
      if (y !== undefined) {
        setYaxis(Object.values(y));
      }
    }
    else{
      const y = getValuesByTimePeriode();
      setYaxis(Object.values(y));
    }
  }, [monthlyCount,yearlyCount,counts,timeSpan]);

  useEffect(() => {
    /* const x = getValuesByTimePeriode();
    setXaxis(Object.keys(x)); */
  }, [counts]);
  useEffect(() => {
    /* const y = getValuesByTimePeriode();
    setYaxis(Object.values(y)); */
  }, [counts]);

  const data = {
    labels: xAxis,
    datasets: [
      {
        label: "count",
        data: yAxis,
        borderColor: "dodgerblue",
      },
    ],
  };
  return (
    <div>
      <Line data={data} />
    </div>
  );
}
