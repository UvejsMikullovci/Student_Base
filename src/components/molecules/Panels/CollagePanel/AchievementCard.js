import React from "react";
import "../../../styles/panelCollage.css";

const AchievementCard = ({ title, subtitle }) => {
  return (
    <div className="achievement-card">
      <span className="trophy">🏆</span>
      <h4>{title}</h4>
      <p>{subtitle}</p>
    </div>
  );
};

export default AchievementCard;
