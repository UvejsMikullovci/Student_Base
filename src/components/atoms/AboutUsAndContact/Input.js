import React from "react";
import "./Input.css";

export default function Input({ label, type = "text", name, placeholder, required = false }) {
  return (
    <div className="input-group">
      {label && <label className="input-label">{label}{required ? " *" : ""}</label>}
      <input className="input-field" type={type} name={name} placeholder={placeholder} required={required} />
    </div>
  );
}
