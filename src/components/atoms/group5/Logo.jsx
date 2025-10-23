import React from "react";
import logo from "../../atoms/group5/logo.png";
import "./Logo.css";


const Logo = () => {
  return (
    <div className="logo">
      <a href="/"><img src={logo} alt="Logo" /></a>
    </div>
  );
};

export default Logo;