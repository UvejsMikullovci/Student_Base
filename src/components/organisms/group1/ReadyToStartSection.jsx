import React from "react";
import { ReadyToStart } from "../../molecules/group1/ReadyToStart";
import "./ReadyToStartSection.css";

export default function ReadyToStartSection() {
  return (
    <div className="ready-section">
      <div className="ready-text">
        <h2>Gati për të filluar?</h2><br></br>
        <p>
          Regjistrohu sot dhe fillo të zbulosh mundësitë e pafundme arsimore që
          të presin.
        </p>
      </div>
      <ReadyToStart />
    </div>
  );
}