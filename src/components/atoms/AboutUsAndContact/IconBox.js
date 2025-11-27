import React from "react";
import "./IconBox.css";

export default function IconBox({ icon, title, description }) {
  return (
    <div className="contact-icon-box">
      <div className="contact-icon">{icon}</div>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}
