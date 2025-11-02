import React from "react";
import {HeroSection} from "../../organisms/group1/HeroSection";
import "./HomePage.css"
import { WhyChooseSection } from "../../organisms/group1/WhyChooseSection";
import { HowItWorksSection } from "../../organisms/group1/HowItWorksSection";
import SuccessSection from "../../organisms/group1/SuccessSection";
import ReadyToStartSection from "../../organisms/group1/ReadyToStartSection";

export function HomePage() {
  return (
    <div className="home-page">
      <HeroSection />
      <WhyChooseSection/>
      <HowItWorksSection/>
      <SuccessSection/>
      <ReadyToStartSection/>
    </div>
    
  );
}

export default HomePage;