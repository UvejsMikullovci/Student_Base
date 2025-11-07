import React from "react";
import "./AmenitiesList.css"

export default function AmenitiesList({ amenities }) {
  return (
    <ul>
      {amenities.map((a, index) => (
        <li key={index}>{a}</li>
      ))}
    </ul>
  );
}
