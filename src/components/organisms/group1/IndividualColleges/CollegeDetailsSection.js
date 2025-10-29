
import React, { useState } from "react";
import CollegeHeader from "../../../molecules/group1/IndividualCollege/CollegeHeader";
import CollegeTabs from "../../../molecules/group1/IndividualCollege/CollegeTabs";
import CollegeInfoBox from "../../../molecules/group1/IndividualCollege/CollegeInfoBox";
import "./CollegeDetailsSection.css";


const CollegeDetailsSection = ({ college }) => {
  const [activeTab, setActiveTab] = useState("pershkrim");

  return (
    <div className="college-details">
      <CollegeHeader college={college} />
      <CollegeTabs activeTab={activeTab} setActiveTab={setActiveTab} />

      {activeTab === "pershkrim" && (
        <CollegeInfoBox title="Rreth Universitetit" text={college.description} />
      )}
      {activeTab === "programet" && (
        <CollegeInfoBox title="Programet" text="Lista e programeve do të shfaqet këtu." />
      )}
      {activeTab === "kontakti" && (
        <CollegeInfoBox title="Kontakti" text={college.contact} />
      )}
    </div>
  );
};

export default CollegeDetailsSection;
