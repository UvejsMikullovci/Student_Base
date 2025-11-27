import React from "react";
import "./HowItWorksCard.css";

export default function HowItWorksCard({icon, title,description}) {
    return(
        <div className="homePageWorkCard">
            <div className="homePageWorkCardIcon">{icon}</div>
            <h3>{title}</h3>
            <p>{description}</p>
        </div>
    );
}