import React from "react";
import ApplicationCard from "../../../atoms/group4/panelAplications/ApplicationCard";
import "./ApplicationsList.css";

const ApplicationsList = ({ applications }) => {
  return (
    <div className="applications-list">
      {applications.map((app, i) => (
        <ApplicationCard key={i} {...app} />
      ))}
    </div>
  );
};

export default ApplicationsList;