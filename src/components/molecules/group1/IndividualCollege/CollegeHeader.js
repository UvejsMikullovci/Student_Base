import React from "react";
import Tag from "../../../atoms/group1/IndividualCollege/Tag";
import IconText from "../../../atoms/group1/IndividualCollege/IconText";
import Button from "../../../atoms/group1/IndividualCollege/button";
import "./CollageHeader.css"; 

const CollegeHeader = ({ college }) => {
  return (
    <div className="college-header">
      <div>
        <h2>{college.name}</h2>
        <Tag text={college.type} />
        <div className="college-meta">
          <div className="svg-city">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-map-pin h-4 w-4"
              aria-hidden="true"
            >
              <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
            <IconText text={college.location} className="city" />
          </div>
          <div className="people">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-users h-4 w-4"
              aria-hidden="true"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
              <path d="M16 3.128a4 4 0 0 1 0 7.744"></path>
              <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
              <circle cx="9" cy="7" r="4"></circle>
            </svg>
            <IconText text={`${college.students} studentë`} />
          </div>
          <IconText text={`⭐${college.rating} (${college.reviews} vlerësime)`} />
          <IconText text={`${college.programs} programe`} />
        </div>
      </div>
      <div className="college-actions">
        <Button label="Apliko tani" variant="primary" />
        <Button label="Ruaj" variant="secondary" />
      </div>
    </div>
  );
};

export default CollegeHeader;
