import React from "react";
import "./Button.css";

export default function Button({ children, type = "button" }) {
  return (
    <button type={type} className="primary-btn">
      {children}
    </button>
  );
}
