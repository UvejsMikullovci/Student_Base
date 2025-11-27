import React from "react";
import "../../../styles/panelCollage.css";

const CollegeInfoCard = () => {
  return (
    <div className="college-info-card">
      <img
        src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b"
        alt="College"
        className="college-image"
      />
      <div className="college-details">
        <h2>Metropolitan University of Technology</h2>
        <div className="college-tags">
          <span className="tag">Public University</span>
          <span className="tag">Established 1975</span>
        </div>
        <p className="college-desc">
          Metropolitan University of Technology is a leading institution dedicated to excellence in education,
          research, and innovation. We offer comprehensive programs across various fields of study.
        </p>
        <ul className="college-contact">
          <li>📍 123 University Ave, Metro City, MC 12345</li>
          <li>📞 +1 (555) 987-6543</li>
          <li>📧 info@met-university.edu</li>
        </ul>
      </div>
    </div>
  );
};

export default CollegeInfoCard;
