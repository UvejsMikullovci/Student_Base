import React from "react";
import CountUp from "react-countup";
import ImageCard from "../../atoms/Homepage/ImageCard";
import "./ImageGrid.css";
import campus from "../../../media/campus.jpg";
import library from "../../../media/library.jpg";
import students from "../../../media/students.jpg";
import uni from "../../../media/uni.jpg";

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

      {/* Info Card with animated number */}
      <div className="info-card">
        <p>Average Success Rate</p>
        <h3>
          ↑{" "}
          <CountUp
            start={0}
            end={94}
            duration={4.5}
            suffix="%"
          />
        </h3>
      </div>

      <div className="grid-item item4">
        <ImageCard src={uni} alt="Building front" />
      </div>
    </div>
  );
}
