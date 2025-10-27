import React from "react";
import {HeroSection} from "../../organisms/group1/HeroSection";
import "./HomePage.css"
import { WhyChooseSection } from "../../organisms/group1/WhyChooseSection";
import { HowItWorksSection } from "../../organisms/group1/HowItWorksSection";


export function HomePage() {
  return (
    <div className="home-page">
      <HeroSection />
      <WhyChooseSection/>
      <HowItWorksSection/>
    
    </div>
    
  );
}

export default HomePage;