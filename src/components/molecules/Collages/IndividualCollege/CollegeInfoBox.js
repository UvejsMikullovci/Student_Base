import React from "react";

const CollegeInfoBox = ({ title, text }) => {
  return (
    <div className="info-box">
      <h3>{title}</h3>
      <p>{text}</p>
    </div>
  );
};

export default CollegeInfoBox;
