import React from "react";
import Button from "../../../atoms/group1/Collages/Button";
import ImageCard from "../../../atoms/group1/Collages/ImageCard";
import Heading from "../../../atoms/group1/Collages/Heading";
import Paragraph from "../../../atoms/group1/Collages/Paragraph";
import '../../../styles/group1/Collages/Collages.css'
import Collages from "../../../pages/group1/Collages/Collages";

function CollegeCard({ college }) {
  return (
    <div className="college-card">
      <ImageCard src={college.image} alt={college.name} />
      <div className="college-info">
        <div className="city-type">
        <Heading text={college.name} />
        <Paragraph text={college.type} className="type" />
        </div>
       <div className="svg-city">
         <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-map-pin h-4 w-4" aria-hidden="true"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"></path><circle cx="12" cy="10" r="3"></circle></svg>
        <Paragraph text={college.location} className="city" />
       </div>
       <div className="student-rating">
       <div className="people">
         <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-users h-4 w-4" aria-hidden="true"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><path d="M16 3.128a4 4 0 0 1 0 7.744"></path><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><circle cx="9" cy="7" r="4"></circle></svg>
        <Paragraph text={college.number} className="numberStudents" />
       </div>
        <Paragraph text={`⭐ ${college.rating}`} className="details" />
       </div>
        <Paragraph text={`€${college.price}/vit`} className="tuition" />
        <Button text="Shiko detajet" />
      </div>
    </div>
  );
}

export default CollegeCard;
