import React from "react";
import programet from "./programet.json";
import "./Programet.css";

function Programet() {
  return (
    <div className="Programet">
      <h1>Programet</h1>
      <div className="cards-container">
        {programet.map((card) => (
          <div key={card.id} className="card">
            <h2>{card.title}</h2>
            <p className="category">{card.category} - {card.university}</p>
            <p className="description">{card.description}</p>
            <p className="details">{card.duration} | {card.degree}</p>
            <button>{card.buttonText}</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Programet;
