import React from "react";

export default function EmployeeTable({ employees = [], onDelete }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Employees</h3>
        <input placeholder="Search" className="border px-3 py-1 rounded text-sm" />
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="text-xs text-gray-500 uppercase">
            <tr>
              <th className="p-2">Name</th>
              <th className="p-2">Role</th>
              <th className="p-2">Dept</th>
              <th className="p-2">Tasks</th>
              <th className="p-2">Status</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map(emp => (
              <tr key={emp._id} className="border-t hover:bg-gray-50">
                <td className="p-2">{emp.name}</td>
                <td className="p-2">{emp.role}</td>
                <td className="p-2">{emp.department}</td>
                <td className="p-2">{emp.activeTasks}</td>
                <td className="p-2">{emp.status}</td>
                <td className="p-2">
                  <button onClick={()=>onDelete(emp._id)} className="text-red-500 text-sm">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
