import React, { useState } from "react";
import CollegeHeader from "../../../molecules/Collages/IndividualCollege/CollegeHeader";
import CollegeTabs from "../../../molecules/Collages/IndividualCollege/CollegeTabs";
import CollegeInfoBox from "../../../molecules/Collages/IndividualCollege/CollegeInfoBox";
import ContactContent from "../../../organisms/Contact/ContactContent";
import "./CollegeDetailsSection.css";

const CollegeDetailsSection = ({ college, programs }) => {
  const [activeTab, setActiveTab] = useState("pershkrim");

  return (
    <div className="college-details">
      <CollegeHeader college={college} />
      <CollegeTabs activeTab={activeTab} setActiveTab={setActiveTab} />

      {activeTab === "pershkrim" && (
        <CollegeInfoBox title="Rreth Universitetit" text={college.description} />
      )}

      {activeTab === "programet" && (
        <div className="college-programs">
          {programs.length > 0 ? (
            <div className="cards-container">
              {programs.map((p) => (
                <div key={p.id} className="card">
                  <h2>{p.title}</h2>
                  <p className="category">{p.category}</p>
                  <p className="description">{p.description}</p>
                  <p className="details">{p.duration} | {p.degree}</p>
                  <button>{p.buttonText}</button>
                </div>
              ))}
            </div>
          ) : (
            <p>Asnjë program nuk u gjet për këtë universitet.</p>
          )}
        </div>
      )}

      {activeTab === "kontakti" && <ContactContent />}
    </div>
  );
};

export default CollegeDetailsSection;
