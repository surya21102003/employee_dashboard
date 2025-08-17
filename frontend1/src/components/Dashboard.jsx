import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import MetricCard from "./MetricCard";
import EmployeeTable from "./EmployeeTable";
import AddEmployee from "./AddEmployee";
import API from "../services/api";
import Empchart from "./Empchart";
import AttendanceOverview from "./AttendanceOverview";
import people from "../images/people.png"; 
import task from "../images/task.png";
import intern from "../images/intern.png"; 
import { BsPeople } from 'react-icons/bs';

import { FaTasks } from 'react-icons/fa';
import { PiStudentFill } from 'react-icons/pi';
export default function Dashboard() {
  const [stats, setStats] = useState({ totalEmployees: 0, activeTasks: 0, interns: 0 });
  const [employees, setEmployees] = useState([]);

  const load = async () => {
    try {
      const s = await API.get("/employees/stats");
      setStats(s.data);
      const list = await API.get("/employees");
      setEmployees(list.data);
    } catch (err) { console.error(err); }
  };

  useEffect(() => { load(); }, []);
  /*
    const handleDelete = async (id) => {
      if (!window.confirm("Delete employee?")) return;
      await API.delete(`/employees/${id}`);
      setEmployees(prev => prev.filter(e=>e._id !== id));
    };
  
    const handleAdded = (emp) => setEmployees(prev => [emp, ...prev]);*/

  return (

    <div className="flex border-blue-400">
      <div className="mr-20"><Sidebar /></div>

      <main className="ml-50 p-8 border-blue-500 w-full bg-softBg min-h-screen mr-20">
        {/* <Header title="Dashboard" role={employees.role}/> */}
        <div className="grid grid-cols-1  border-blue-00  md:grid-cols-3 gap-6 mb-6">
          <div className="flex  shadow w-60 bg-white h-20">
            {/* <MetricCard title="Total Employees" value={stats.totalEmployees} /> */}
            <div className="flex flex-col justify-center w-50 ml-4">
              <h3>Total Employees</h3>
              <p>{stats.totalEmployees}</p>
            </div>
            
            <BsPeople className="h-8 w-15 mt-7 ml-15 mr-3" />
          </div>
          <div className="flex shadow w-60 bg-white w-50 h-20">
            <div className="flex flex-col justify-center ml-4">
              <h3>Active Tasks</h3>
              <p>{stats.activeTasks}</p>
            </div>
            <FaTasks className="h-8 w-15 mt-7 ml-15" />
          </div>
          <div className="flex shadow w-60 bg-white w-50  h-20">
            <div className="flex flex-col justify-center ml-4">
              <h3>Interns</h3>
              <p>{stats.interns}</p>
            </div>
            <PiStudentFill className="h-8 w-15  mt-7 ml-15" />
          </div>


        </div>
        <div className="flex h-110 ">

          <Empchart></Empchart>
          <AttendanceOverview></AttendanceOverview>

        </div>
        {/*
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6" id="employees">
          <EmployeeTable employees={employees} onDelete={handleDelete} />
          <AddEmployee onAdded={handleAdded} />
        </div>*/}

      </main>

    </div>
  );
}

/*


<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6" id="employees">
          <EmployeeTable employees={employees} onDelete={handleDelete} />
          <AddEmployee onAdded={handleAdded} />
        </div>

*/