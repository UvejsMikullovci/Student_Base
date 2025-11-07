import React from "react";
import { useParams } from "react-router-dom";
import CollegeDetailsSection from "../../../organisms/group1/IndividualColleges/CollegeDetailsSection";
import programsData from "../../../pages/group2/programet.json";
import collegeData from "../../../../data/colleges.json"; // ✅ renamed to match usage below

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