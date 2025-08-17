import React from "react";

export default function MetricCard({ title, value, subtitle }) {
  return (
    <div className="bg-white p-6 rounded-xl card-anim">
      <p className="text-sm text-gray-500">{title}</p>
      <h3 className="text-2xl font-bold">{value}</h3>
      {subtitle && <p className="text-xs text-gray-400 mt-1">{subtitle}</p>}
    </div>
  );
}
