import React from "react";
import "./StatCard.css";

const StatCard = ({ label, value, type }) => {
  return (
    <div className={`stat-card ${type}`}>
      <span className="stat-label">{label}</span>
      <h2 className="stat-value">{value}</h2>
    </div>
  );
};

export default StatCard;