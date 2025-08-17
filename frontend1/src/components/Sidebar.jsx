













import React from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import logo from "../images/logo.pg.png";

import { BsPeople } from 'react-icons/bs';

import { FaTasks } from 'react-icons/fa';
import { PiStudentFill } from 'react-icons/pi';
import { AiFillSetting } from 'react-icons/ai';
import { BiHomeAlt } from 'react-icons/bi';
import { FaRegCalendarAlt } from 'react-icons/fa';
import { AiOutlineSearch } from 'react-icons/ai';
export default function Sidebar(){
/*  const loc = useLocation();
  const items = [
    { name: "Dashboard", to: "/dashboard" },
    { name: "Employees", to: "/Employees" },
    { name: "Attendance", to: "/Attendance" },
    { name: "Tasks", to: "/Tasks" },
    { name: "Settings", to: "/Settings" }
  ];*/
  return (
    <motion.aside initial={{ x:-200 }} animate={{ x:0 }} className="w-64 bg-blue-400 text-white p-6 min-h-screen fixed">
     
     <div className="flex">
      <img src={logo} alt="Logo" className="w-12 h-12 mr-3" />
      <h2 className="text-xl font-bold mb-6">workflow</h2>
      </div> 
      <nav className="flex flex-col gap-3">
      { /* {items.map(i => (
          <Link key={i.to} to={i.to} className={`p-2 rounded ${loc.pathname === i.to ? "bg-white text-indigo-600 font-semibold" : "hover:bg-blue-500/30"}`}>
            {i.name}
          </Link>
        ))}  
      */}
      <input type="text" placeholder="Search..." className="p-2 mt-10 rounded bg-white text-black mb-4" />


        <Link to="/dashboard" className="p-2 rounded hover:bg-blue-500/30">
          <BiHomeAlt className="inline-block mr-2" />
          Dashboard  </Link>
        
        <Link to="/employ" className="p-2 rounded hover:bg-blue-500/30">
          <BsPeople className="inline-block mr-2" />
          Employees
        </Link>
        <Link to="/attendance" className="p-2 rounded hover:bg-blue-500/30">
        <FaRegCalendarAlt className="inline-block mr-2" />
          Attendance
        </Link>
        <Link to="/empchart" className="p-2 rounded hover:bg-blue-500/30">
          <FaTasks className="inline-block mr-2" />
          Tasks
        </Link>
        <Link to="/*" className="p-2 rounded hover:bg-blue-500/30">
          <AiFillSetting className="inline-block mr-2" />
          Settings
        </Link>
      </nav>
    </motion.aside>
  );
}
