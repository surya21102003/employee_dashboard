import React, { useState } from "react";
import API from "../services/api";

export default function AddEmployee({ onAdded }) {
  const [form, setForm] = useState({ name:"", email:"", role:"Employee", department:"", activeTasks:0, isIntern:false });

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/employees", form);
      setForm({ name:"", email:"", role:"Employee", department:"", activeTasks:0, isIntern:false });
      onAdded && onAdded(res.data);
    } catch(err) {
      alert(err.response?.data?.message || "Cannot add employee");
    }
  };

  return (
    <form onSubmit={submit} className="bg-white p-6 rounded-xl shadow space-y-3">
      <h3 className="text-lg font-semibold">Add Employee</h3>
      <input placeholder="Name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} className="w-full border p-2 rounded" />
      <input placeholder="Email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} className="w-full border p-2 rounded" />
      <input placeholder="Department" value={form.department} onChange={e=>setForm({...form,department:e.target.value})} className="w-full border p-2 rounded" />
      <div className="flex gap-2">
        <input type="number" placeholder="Active Tasks" value={form.activeTasks} onChange={e=>setForm({...form,activeTasks:+e.target.value})} className="border p-2 rounded w-1/2" />
        <label className="flex items-center gap-2"><input type="checkbox" checked={form.isIntern} onChange={e=>setForm({...form,isIntern:e.target.checked})} /> Intern</label>
      </div>
      <button className="bg-black text-white px-4 py-2 rounded">Add</button>
    </form>
  );
}
