import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import "../Style/chart.css"; 
import API from "../services/api";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Empchart = () => {
  const [employees, setEmployees] = useState([]);

  const load = async () => {
    try {
      
      const list = await API.get("/employees");
      setEmployees(list.data);
    } catch(err){ console.error(err); }
  };
  
  useEffect(()=>{ load(); },[]);
  

  
  const chartData = {
    labels: employees.map((emp) => emp.name),
    datasets: [
      {
        label: "Active Tasks",
        data: employees.map((emp) => emp.activeTasks),
        backgroundColor: employees.map(emp =>
          emp.isIntern ? "rgba(74, 37, 209, 0.7)" : "rgba(54, 162, 235, 0.7)"
        ),
        borderColor: employees.map(emp =>
          emp.isIntern ? "rgba(64, 34, 146, 1)" : "rgba(54, 162, 235, 1)"
        ),
        borderWidth: 1,
        borderRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: {
        display: true,
        text: "Employee Activity Overview",
        font: { size: 20, weight: "bold" },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const emp = employees[context.dataIndex];
            return `${emp.name} (${emp.role}) - ${emp.activeTasks} tasks,${emp.isIntern ? " Intern" : " Employee"}`;
          },
        },
      },
    },
    scales: {
      y: { beginAtZero: true, ticks: { stepSize: 1 }, grid: { drawTicks: false, drawBorder: false, display: false },
    x:{
        beginAtZero: true,
        ticks:{display:false},
        grid: { drawTicks: false, drawBorder: false, display: false }
    }
    
    },
    },
    animation: {
      duration: 1500,
      easing: "easeOutBounce",
    },
  };

  return (
    <div className="chart-container w-120 h-80">
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default Empchart;