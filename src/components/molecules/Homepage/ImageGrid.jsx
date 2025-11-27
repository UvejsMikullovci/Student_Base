import React from "react";
import CountUp from "react-countup";
import ImageCard from "../../atoms/Homepage/ImageCard";
import "./ImageGrid.css";
import campus from "../../../media/campus.jpg";
import library from "../../../media/library.jpg";
import students from "../../../media/students.jpg";
import uni from "../../../media/uni.jpg";

export default function ImageGrid() {
  return (
    <div className="imageGrid">
      <div className="gridBlock blockCampus">
        <ImageCard src={campus} alt="Campus View" />
      </div>
      <div className="gridBlock blockStudents">
        <ImageCard src={students} alt="Students Studying" />
      </div>
      <div className="gridBlock blockLibrary">
        <ImageCard src={library} alt="Library Interior" />
      </div>
      <div className="infoBadge">
        <p className="infoLabel">Average Success Rate</p>
        <h3 className="infoValue">
          ↑ <CountUp start={0} end={94} duration={2.8} suffix="%" />
        </h3>
      </div>
      <div className="gridBlock blockUni">
        <ImageCard src={uni} alt="University Building" />
      </div>
    </div>
  );
}