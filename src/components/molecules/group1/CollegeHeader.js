import React from "react";
import Tag from "../../atoms/group1/Tag";
import IconText from "../../atoms/group1/IconText";
import Button from "../../atoms/group1/button";

const CollegeHeader = ({ college }) => {
  return (
    <div className="college-header">
      <div>
        <h2>{college.name}</h2>
        <Tag text={college.type} />
        <div className="college-meta">
          <IconText icon="📍" text={college.location} />
          <IconText icon="🎓" text={`${college.students} studentë`} />
          <IconText icon="⭐" text={`${college.rating} (${college.reviews} vlerësime)`} />
          <IconText icon="📚" text={`${college.programs} programe`} />
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
