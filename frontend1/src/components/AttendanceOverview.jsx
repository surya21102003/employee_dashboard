import React, { useEffect, useState } from "react";
//import "../Style/attendancs.css";
import API from "../services/api";

//import React from 'react';
import '../Style/attendancs.css';
import Sidebar from "./Sidebar";




const AttendanceCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 5, 16)); // Start with June 2025

  const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

  const handlePrevMonth = () => {
    setCurrentDate(prevDate => {
      const prevMonth = prevDate.getMonth() - 1;
      const prevYear = prevDate.getFullYear();
      return new Date(prevYear, prevMonth, 1);
    });
  };

  const handleNextMonth = () => {
    setCurrentDate(prevDate => {
      const nextMonth = prevDate.getMonth() + 1;
      const nextYear = prevDate.getFullYear();
      return new Date(nextYear, nextMonth, 1);
    });
  };

  const renderCalendar = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const monthName = currentDate.toLocaleString('default', { month: 'long' });
    const numDays = daysInMonth(year, month);
    const startDay = firstDayOfMonth(year, month); 

    
    const startingOffset = startDay === 0 ? 6 : startDay - 1;

    const days = [];
    
    for (let i = 0; i < startingOffset; i++) {
      days.push(null);
    }
    
    for (let i = 1; i <= numDays; i++) {
      days.push(i);
    }

    return days.map((day, index) => (
      <div
        key={index}
        className={`calendar-day ${day === 16 && month === 5 && year === 2025 ? 'selected-day' : ''}`}
      >
        {day}
      </div>
    ));
  };

  return (
    <div>

      <div className="attendance-container ml-10">
        <h2 className="attendance-title text-gray-500 mr-10">Attendance Overview</h2>
        <div className="calendar-card ">
          <div className="calendar-header">
            <span className="nav-arrow" onClick={handlePrevMonth}>&larr;</span>
            <span className="month-year">{currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}</span>
            <span className="nav-arrow" onClick={handleNextMonth}>&rarr;</span>
          </div>
          <div className="days-of-week">
            <span>Mon</span>
            <span>Tue</span>
            <span>Wed</span>
            <span>Thu</span>
            <span>Fri</span>
            <span>Sat</span>
            <span>Sun</span>
          </div>
          <div className="calendar-grid">
            {renderCalendar()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceCalendar;


/*
const AttendanceCalendar = () => {
  // Hardcoded dates for June 2025 to match the screenshot
  const dates = [
    null, 1, 2, 3, 4, 5, 6,
    7, 8, 9, 10, 11, 12, 13,
    14, 15, 16, 17, 18, 19, 20,
    21, 22, 23, 24, 25, 26, 27,
    28, 29, 30, null, null, null, null
  ];

  return (
    <div className="attendance-container">
      <h2 className="attendance-title">Attendance Overview</h2>
      <div className="calendar-card">
        <div className="calendar-header">
          <span className="nav-arrow">&larr;</span>
          <span className="month-year">June, 2025</span>
          <span className="nav-arrow">&rarr;</span>
        </div>
        <div className="days-of-week">
          <span>Mon</span>
          <span>Tue</span>
          <span>Wed</span>
          <span>Thu</span>
          <span>Fri</span>
          <span>Sat</span>
          <span>Sun</span>
        </div>
        <div className="calendar-grid">
          {dates.map((date, index) => (
            <div
              key={index}
              className={`calendar-day ${date === 16 ? 'selected-day' : ''}`}
            >
              {date}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AttendanceCalendar;


/*
const AttendanceOverview = () => {
  const [employees, setEmployees] = useState([]);



  const load = async () => {
    try {
      
      const list = await API.get("/employees");
      setEmployees(list.data);
    } catch(err){ console.error(err); }
  };
  
  useEffect(()=>{ load(); },[]);

  // Generate days for the month (example: August 2025)
  const daysInMonth = 31; 
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  return (
    <div className="attendance-container">
      <h2>Attendance Overview</h2>
      <div className="calendar-header">
        {days.map((day) => (
          <div key={day} className="calendar-day">
            {day}
          </div>
        ))}
      </div>

      {employees.map((emp) => (
        <div key={emp.email} className="calendar-row">
          {days.map((day) => {
            // For demo: random attendance, replace with real data from API
            const isPresent = Math.random() > 0.2; 
            return (
              <div
                key={day}
                className={`calendar-cell ${isPresent ? "present" : "absent"}`}
                title={`${emp.name} - ${day} ${isPresent ? "Present" : "Absent"}`}
              ></div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default AttendanceOverview;*/