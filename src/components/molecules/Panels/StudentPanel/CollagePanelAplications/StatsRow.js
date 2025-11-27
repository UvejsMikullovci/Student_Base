import React from "react";
import StatCard from "../../../../atoms/StudentPanel/panelAplications/StatCard";
import "./StatsRow.css";

const StatsRow = ({ total, accepted, pending, rejected }) => {
  return (
    <div className="stats-row">
      <StatCard label="Totale" value={total} type="total" />
      <StatCard label="Të pranuara" value={accepted} type="accepted" />
      <StatCard label="Në pritje" value={pending} type="pending" />
      <StatCard label="Të refuzuara" value={rejected} type="rejected" />
    </div>
  );
};

export default StatsRow;