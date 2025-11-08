import React from "react";
import "../../styles/panelCollage.css";
import CollegeProfileSection from "../../../organisms/panelCollage/CollegeProfileSection";
import RecentPostsSection from "../../../organisms/panelCollage/RecentPostsSection";
import AchievementsSection from "../../../organisms/panelCollage/AchievementsSection";

const PanelCollege = () => {
  return (
    <div className="panel-college-container">
      <div className="panel-tabs">
        <button className="panel-tab">Professor Panel</button>
        <button className="panel-tab active">College Panel</button>
        <button className="panel-tab">Landlord Panel</button>
        <button className="panel-tab">Dorm Listings</button>
      </div>
      <CollegeProfileSection />
      <RecentPostsSection />
      <AchievementsSection />
    </div>
  );
};

export default PanelCollege;
