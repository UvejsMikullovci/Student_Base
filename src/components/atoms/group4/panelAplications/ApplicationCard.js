import React from "react";
import "./ApplicationCard.css";

const ApplicationCard = ({ university, program, date, status }) => {
  return (
    <div className="application-card">
      <div className="application-top">
        <div className="application-left">
          <div>
            <h3 className="application-university">{university}</h3>
            <p className="application-program">{program}</p>
          </div>
        </div>

        <span className={`status-badge ${status.toLowerCase()}`}>{status}</span>
      </div>

      <hr className="application-divider" />

      <div className="application-bottom">
        <div className="application-date">
          {date}
        </div>
        <button className="details-btn">Shiko detajet</button>
      </div>
    </div>
  );
};

export default ApplicationCard;