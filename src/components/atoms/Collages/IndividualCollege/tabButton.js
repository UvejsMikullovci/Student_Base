import React from "react";

const TabButton = ({ label, active, onClick }) => {
  return (
    <button
      className={`tab-button ${active ? "active" : ""}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default TabButton;
