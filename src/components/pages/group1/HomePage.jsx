import React from "react";
import { HeroSection } from "../../organisms/group1/HeroSection";
import "./HomePage.css";
import { WhyChooseSection } from "../../organisms/group1/WhyChooseSection";
import { HowItWorksSection } from "../../organisms/group1/HowItWorksSection";
import SuccessSection from "../../organisms/group1/SuccessSection";
import ReadyToStartSection from "../../organisms/group1/ReadyToStartSection";
import Programet from "../group2/programet";
import SectionHeader from "../../molecules/group1/SectionHeader";
import { useNavigate } from "react-router-dom";

export function HomePage() {
  const navigate = useNavigate();

  const handleViewAll = () => {
    navigate("/programet"); // navigon te faqja e plotë e programeve
  };

  return (
    <div className="home-page">
      <HeroSection />
      <WhyChooseSection />

      <div className="programet-section">
        <div className="programet-header">
   <SectionHeader
          title="Programet e zgjedhura"
          subtitle="Zbulo institucionet më të mira arsimore"
          buttonText="Shiko të gjitha"
          onButtonClick={handleViewAll}
        />
        </div>
        <div className="programet-cards">
        <Programet showOnlyCards /> {/* Vetëm 3 karta + slider */}
        </div> 
      </div>

      <HowItWorksSection />
      <SuccessSection />
      <ReadyToStartSection />
    </div>
  );
}

export default HomePage;
