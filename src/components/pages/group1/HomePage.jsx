import React from "react";
import { HeroSection } from "../../organisms/group1/HeroSection";
import "./HomePage.css";
import { WhyChooseSection } from "../../organisms/group1/WhyChooseSection";
import { HowItWorksSection } from "../../organisms/group1/HowItWorksSection";
import SuccessSection from "../../organisms/group1/SuccessSection";
import ReadyToStartSection from "../../organisms/group1/ReadyToStartSection";
import Programet from "../group2/programet";
import SectionHeader from "../../molecules/group1/SectionHeader";

export function HomePage() {
  const handleViewAll = () => {
    console.log("Klikuar: Shiko të gjitha programet");
  };

  return (
    <div className="home-page">
      <HeroSection />
      <WhyChooseSection />

      <div className="programet-section" style={{ backgroundColor: "#fffcf6", padding: "40px 0" }}>
        <SectionHeader
          title="Programet e zgjedhura"
          subtitle="Zbulo institucionet më të mira arsimore"
          buttonText="Shiko të gjitha"
          onButtonClick={handleViewAll}
        />
        <Programet showOnlyCards />
      </div>

      <HowItWorksSection />
      <SuccessSection />
      <ReadyToStartSection />
    </div>
  );
}

export default HomePage;
