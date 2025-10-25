import React from "react";
import {HeroSection} from "../../organisms/group1/HeroSection";
import "./HomePage.css"
import { WhyChooseSection } from "../../organisms/group1/WhyChooseSection";

export function HomePage() {
  return (
    <div className="home-page">
      <HeroSection />
      <WhyChooseSection/>
    </div>
    
  );
}

export default HomePage;