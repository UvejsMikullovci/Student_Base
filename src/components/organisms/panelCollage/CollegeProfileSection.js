import React from "react";
import CollegeInfoCard from "../../molecules/panelCollage/CollegeInfoCard";

const CollegeProfileSection = () => {
  return (
    <section className="college-section">
      <div className="section-header">
        <h3>College Profile</h3>
        <button className="edit-btn">Edit Profile</button>
      </div>
      <CollegeInfoCard />
    </section>
  );
};

export default CollegeProfileSection;
