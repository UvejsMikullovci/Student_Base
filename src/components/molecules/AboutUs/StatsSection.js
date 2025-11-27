import React from "react";
import StatBox from "../../atoms/AboutUsAndContact/StatBox";
import "./StatsSection.css";

export default function StatsSection() {
  return (
    <div className="stats-section">
      <StatBox number="50+" label="Kolegje partnere" />
      <StatBox number="10,000+" label="Studentë aktivë" />
      <StatBox number="200+" label="Programe studimi" />
      <StatBox number="95%" label="Sukses në studime" />
    </div>
  );
}
