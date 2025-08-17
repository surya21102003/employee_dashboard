import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";
import { setAuthToken } from "./services/api";
import Employ from "./components/Employ";
import Ademp from "./components/Ademp";
import AttendanceCalendar from "./components/AttendanceOverview";
import Empchart from "./components/Empchart";
function App(){
  useEffect(() => {
    const token = localStorage.getItem("token");
    setAuthToken(token);
  }, []);

  return (
    
    <Router>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/Employ" element={<Employ></Employ>} />
        <Route path="/Ademp" element={<Ademp></Ademp>} />
        <Route path="/attendance" element={<AttendanceCalendar />} />
        <Route path="/Empchart" element={<Empchart />} />
        <Route path="*" element={<Navigate to="/dashboard" />} />
      </Routes>
    </Router>
  );
}

export default App;
