import React from "react";
import "./SectionHeader.css";

function SectionHeader({ title, subtitle, buttonText, onButtonClick }) {
  return (
    <div className="section-header">
      <div className="section-texts">
        <h2>{title}</h2>
        <p>{subtitle}</p>
      </div>
      <button className="view-all-btn" onClick={onButtonClick}>
        {buttonText} →
      </button>
    </div>
  );
}

export default SectionHeader;
