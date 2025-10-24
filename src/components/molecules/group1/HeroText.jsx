import React from "react";
import { Heading } from "../../atoms/group1/Heading";
import { Paragraph } from "../../atoms/group1/Paragraph";
import { Button } from "../../atoms/group1/Button";
import "./HeroText.css";

export function HeroText() {
  return (
    <div className="hero-text">
      <Heading />
      <Paragraph />
      <div className="hero-buttons">
        <Button label="Explore Colleges" type="primary" />
        <Button label="Apply Now" type="secondary" />
      </div>
    </div>
  );
}
