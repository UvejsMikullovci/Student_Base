import React from "react";
import "./StatBox.css";

export default function StatBox({ number, label }) {
  return (
    <div className="stat-box">
      <h3 className="stat-number">{number}</h3>
      <p className="stat-label">{label}</p>
    </div>
  );
}
