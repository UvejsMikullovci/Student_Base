import React from "react";
import { WhyChooseGrid } from "../../molecules/Homepage/WhyChooseGrid";
import "./WhyChooseSection.css";

export function WhyChooseSection(){
    return(
        <section className="why-section">
            <div className="why-section-content">
            <h2>Pse të zgjedhësh platformën tonë?</h2>
            <p>Ne ofrojmë zgjidhjen më të plotë për studentët që duan të gjejnë kolegjet e duhura.</p>
            <WhyChooseGrid/>
            </div>
        </section>
    );
}