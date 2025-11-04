import React from "react";
import { HeroText } from "../../molecules/group1/HeroText";
import { StatsGroup } from "../../molecules/group1/StatsGroup";
import { ImageGrid } from "../../molecules/group1/ImageGrid";
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
