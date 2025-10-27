import React from "react";
import "./HowItWorksCard.css";

export function HowItWorksCard({icon, title,description}) {
    return(
        <div className="Work-card">
            <div className="workcard">{icon}</div>
            <h3>{title}</h3>
            <p>{description}</p>
        </div>
    );
}