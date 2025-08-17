import React, { useState } from "react";
import API from "../services/api";
import Sidebar from "./Sidebar";
import { useNavigate } from "react-router-dom";
import stand from "../images/stand.png";
export default function Ademp() {
  /* const [employees, setEmployees] = useState([]);
  
    const load = async () => {
      try {
        
        const list = await API.get("/employees");
        setEmployees(list.data);
      } catch(err){ console.error(err); }
    };
    const onAdded = (emp) => setEmployees(prev => [emp, ...prev]);
   useEffect(() => { load(); }, []);*/


  const [form, setForm] = useState({ name: "", email: "", role: "Employee", department: "", activeTasks: 0, isIntern: false });
const navigate = useNavigate();
  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/employees", form);
      setForm({ name: "", email: "", role: "Employee", department: "", activeTasks: 0, isIntern: false });
      navigate("/Employ");
    } catch (err) {
      alert(err.response?.data?.message || "Cannot add employee");
    }
  };

  return (
    <div className="flex bg-white" >
      <div>
        <img src={stand} alt="Stand" className="w-45 mt-40 mr-10 h-120 mr-3" />
      </div>

      <div className="flex-col shadow justify-center w-100 h-120 mt-15 items-center  bg-white">
        <form onSubmit={submit} className="bg-white p-6 rounded-xl shadow space-y-3">
          <h3 className="text-lg text-blue-300  font-semibold">Add new Employee</h3>
          <div> <input placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="w-80 border p-2 rounded" /></div>
          <div> <input placeholder="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className="w-80 border p-2 rounded" /></div>
          <div> <input placeholder="Department" value={form.department} onChange={e => setForm({ ...form, department: e.target.value })} className="w-80 border p-2 rounded" /></div>
          <div className="flex gap-2">
            <input type="number" placeholder="Active Tasks" value={form.activeTasks} onChange={e => setForm({ ...form, activeTasks: +e.target.value })} className="w-80 border p-2 rounded w-1/2" />
            <label className="flex items-center gap-2"><input type="checkbox" checked={form.isIntern} onChange={e => setForm({ ...form, isIntern: e.target.checked })} /> Intern</label>
          </div>
          <button className="bg-black text-white bg-blue-500 px-4 py-2 rounded mr-5">Add Employee</button>
          <button type="button" onClick={() => navigate("/Employ")} className="bg-gray-300 text-black px-4 py-2 rounded">Cancel</button>
        </form>
      </div>
    </div>
  );
}
