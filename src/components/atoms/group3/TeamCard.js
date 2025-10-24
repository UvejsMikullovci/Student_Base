import React from "react";
import "./TeamCard.css";

export default function TeamCard({ name, position, image }) {
  return (
    <div className="team-card">
      <div className="team-image">
        <img src={image} alt={name} />
      </div>
      <h4>{name}</h4>
      <p>{position}</p>
    </div>
  );
}
