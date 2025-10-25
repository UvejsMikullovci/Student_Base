import React from "react";
import "./Button.css";
import Paneli from "../../pages/group4/panelAplications/panelAplications"

const Button = ({ label, onClick }) => {
  return (
    <button className="btn" onClick={onClick}>{label}</button>
    // <h1>test</h1>
  );
};

export default Button;
