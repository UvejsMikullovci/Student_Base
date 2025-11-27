import React from "react";
import { HowItWorks } from "../../molecules/Homepage/HowItWorks";
import "./HowItWorksSection.css";

export function HowItWorksSection(){
    return(
        <section className="how-section">
            <div className="how-section-content">
            <h2>Si funksionon?</h2>
            <p>Tri hapa të thjeshtë për të gjetur kolegjen ideale</p>
            <HowItWorks/>
            </div>
        </section>
    );
}