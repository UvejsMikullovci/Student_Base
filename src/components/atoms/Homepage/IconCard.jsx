import React from "react";
import "./IconCard.css";

export default function IconCard({icon, title,description}) {
    return(
        <div className="homePageIconCard">
            <div className="icon">{icon}</div>
            <h3>{title}</h3>
            <p>{description}</p>
        </div>
    );
}