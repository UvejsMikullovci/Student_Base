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
           
            <IconText text={college.location} className="city" />
          </div>
          <div className="people">
           
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
