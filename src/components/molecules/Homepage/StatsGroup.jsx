import React from "react";
import StatItem from "../../atoms/Homepage/StatItem";
import "./StatsGroup.css";

export function StatsGroup() {
  return (
    <div className="stats-group">
      <StatItem number="25+" label="Colleges" />
      <StatItem number="150+" label="Programs" />
      <StatItem number="5,000+" label="Students" />
    </div>
  );
}