import React from "react";
import { useParams } from "react-router-dom";
import CollegeDetailsSection from "../../../organisms/Collages/IndividualColleges/CollegeDetailsSection";
import programsData from "../../../pages/Programs/Programs.json";
import collegeData from "../../../../data/colleges.json";

const CollegeDetailsPage = () => {
  const { collegeId } = useParams();

  // ✅ Find the college by ID from the array
  const college = collegeData.find((c) => c.id === collegeId);

  if (!college) {
    return <p>Kolegji me këtë ID nuk u gjet.</p>;
  }

  // ✅ Filter programs for that specific college
  const programsForCollege = programsData.filter(
    (program) => program.university === college.name
  );

  return <CollegeDetailsSection college={college} programs={programsForCollege} />;
};

export default CollegeDetailsPage;