import React from 'react';
import "./StateItem.css";

export function StatItem({number, label}){
    return(
        <div className="stat-item">
            <h3>{number}</h3>
            <p>{label}</p>
        </div>
    );
}