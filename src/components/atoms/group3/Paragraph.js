import React from "react";
import "./Paragraph.css";

export default function Paragraph({ text, className = "" }) {
  return <p className={`paragraph ${className}`}>{text}</p>;
}
