import React from "react";
import { ImageCard } from "../../atoms/group1/ImageCard";
import "./ImageGrid.css";

import campus from "../../molecules/group1/campus.jpg";
import library from "../../molecules/group1/library.jpg";
import students from "../../molecules/group1/students.jpg";
import uni from "../../molecules/group1/uni.jpg";

export function ImageGrid() {
  return (
    <div className="image-grid">
      <div className="grid-item item1">
        <ImageCard src={campus} alt="Campus view" />
      </div>

      <div className="grid-item item2">
        <ImageCard src={students} alt="Students studying" />
      </div>

      <div className="grid-item item3">
        <ImageCard src={library} alt="Library interior" />
        
      </div>
      <div className="info-card">
          <p>Average Success Rate</p>
          <h3>↑ 94%</h3>
        </div>

      <div className="grid-item item4">
        <ImageCard src={uni} alt="Building front" />
      </div>
    </div>
  );
}