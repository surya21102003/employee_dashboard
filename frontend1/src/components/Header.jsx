import React from "react";
import { motion } from "framer-motion";

export default function Header({role}){
  return (
    <motion.header initial={{ y:-20, opacity:0 }} animate={{ y:0, opacity:1 }} className="bg-white shadow-sm p-4 rounded mb-6 flex items-center justify-between">
      <h1 className="text-2xl font-bold text-gray-800">{role}</h1>
      <div className="flex items-center gap-3">
       {/* <input type="text" placeholder="Search..." className="border rounded px-3 py-1 text-sm" /> */}
        <button className="p-2 rounded-full bg-gray-100">🔔</button>
        <div className="flex items-center gap-2">
          {/* <img alt="profile" src="https://via.placeholder.com/36" className="rounded-full" /> */}
          <span className="text-gray-700">{role}</span>
        </div>
      </div>
    </motion.header>
  );
}
