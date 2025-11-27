import React from "react";
import "./Button.css"

export default function Button({ label, onClick, type = "button" }) {
  return <button type={type} onClick={onClick}>{label}</button>;
}
