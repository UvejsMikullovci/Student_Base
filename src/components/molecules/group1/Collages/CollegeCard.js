import React from "react";
import { Link } from "react-router-dom";
import Button from "../../../atoms/group1/Collages/Button";
import ImageCard from "../../../atoms/group1/Collages/ImageCard";
import Heading from "../../../atoms/group1/Collages/Heading";
import Paragraph from "../../../atoms/group1/Collages/Paragraph";
import "../../../styles/group1/Collages/Collages.css";

function CollegeCard({ college }) {
  return (
    <div className="college-card">
      {/* 🖼️ College Image */}
      <ImageCard src={college.image} alt={college.name} />

      {/* 📄 College Info Section */}
      <div className="college-info">
        {/* College Name + Type */}
        <div className="city-type">
          <Heading text={college.name} />
          <Paragraph text={college.type} className="type" />
        </div>

        {/* 📍 City Section */}
        <div className="svg-city">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-map-pin h-4 w-4"
            aria-hidden="true"
          >
            <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          <Paragraph text={college.location} className="city" />
        </div>

        {/* 👩‍🎓 Students + ⭐ Rating */}
        <div className="student-rating">
          <div className="people">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-users h-4 w-4"
              aria-hidden="true"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <path d="M16 3.128a4 4 0 0 1 0 7.744" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
              <circle cx="9" cy="7" r="4" />
            </svg>
            <Paragraph text={college.number} className="numberStudents" />
          </div>
          <Paragraph text={`⭐ ${college.rating}`} className="details" />
        </div>

        {/* 💰 Tuition */}
        <Paragraph text={`€${college.price}/vit`} className="tuition" />

        {/* 🔗 Button linking to /kolegjte/:id */}
        {college.id && (
          <Link to={`/kolegjte/${college.id}`} className="college-link">
            <Button text="Shiko detajet" />
          </Link>
        )}
      </div>
    </div>
  );
}

export default CollegeCard;