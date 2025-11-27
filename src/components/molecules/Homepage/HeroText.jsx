import React from "react";
import Heading from "../../atoms/Homepage/Heading";
import Paragraph from "../../atoms/Homepage/Paragraph";
import Button from "../../atoms/Homepage/Button";
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
