import React from "react";
import "./Heading.css";

export default function Heading({ text, className = "" }) {
  return (
    <h2 className={`heading ${className}`}>
      {text}
    </h2>
  );
}
