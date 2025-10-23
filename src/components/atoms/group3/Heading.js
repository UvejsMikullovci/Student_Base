import React from "react";

export default function Heading({ text, className }) {
  return (
    <h2 className={`text-3xl font-bold text-center text-red-700 mb-4 ${className}`}>
      {text}
    </h2>
  );
}
