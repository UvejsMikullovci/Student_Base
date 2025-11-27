import React from "react";
import CountUp from "react-countup";
import "./StateItem.css";

export default function StatItem({ number, label }) {
  
  const hasPlus = number.includes("+");
  const cleanNumber = parseInt(number.replace("+", ""));

  return (
    <div className="stat-item">
      <h3>
        <CountUp
          start={0}
          end={cleanNumber}
          duration={4.5} 
          suffix={hasPlus ? "+" : ""}
        />
      </h3>
      <p>{label}</p>
    </div>
  );
}
