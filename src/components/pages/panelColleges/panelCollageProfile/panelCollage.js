import React from "react";
import "../../../styles/panelCollage.css";
import CollegeProfileSection from "../../../organisms/panelCollage/CollegeProfileSection";
import RecentPostsSection from "../../../organisms/panelCollage/RecentPostsSection";
import AchievementsSection from "../../../organisms/panelCollage/AchievementsSection";

const PanelCollege = () => {
  return (
    <div className="panel-college-container">
      <CollegeProfileSection />
      <RecentPostsSection />
      <AchievementsSection />
    </div>
  );
};

export default PanelCollege;
