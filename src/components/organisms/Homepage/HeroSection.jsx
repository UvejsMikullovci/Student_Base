import React from "react";
import { HeroText } from "../../molecules/Homepage/HeroText";
import { StatsGroup } from "../../molecules/Homepage/StatsGroup";
import ImageGrid from "../../molecules/Homepage/ImageGrid";
import "./HeroSection.css";

export function HeroSection() {
  return (
    <section className="hero-section">
      <div className="hero-left">
        <HeroText />
        <StatsGroup />
      </div>
      <div className="hero-right">
        <ImageGrid />
      </div>
    </section>
  );
}
