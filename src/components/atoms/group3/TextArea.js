import React from "react";
import "./Input.css";

export default function TextAreaarea({ label, name, placeholder, required = false }) {
  return (
    <div className="input-group">
      {label && <label className="input-label">{label}{required ? " *" : ""}</label>}
      <textarea className="input-field textarea-field" name={name} placeholder={placeholder} required={required} />
    </div>
  );
}
