import React from "react";

export default function Paragraph({ text, className }) {
  return <p className={`text-gray-700 text-center mb-4 ${className}`}>{text}</p>;
}
