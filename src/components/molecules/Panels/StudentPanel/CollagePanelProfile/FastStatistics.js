import React, { useState, useEffect } from "react";
import "./FastStatistics.css";

export default function FastStatistics({ title, headingOne, headingTwo, headingThree, headingFour }) {
  const [stats, setStats] = useState({
    total: 0,
    accepted: 0,
    pending: 0,
    documents: 0,
  });

  useEffect(() => {
    // Example: fetch application stats from Firestore later
    // For now, pull documents from localStorage
    const userDocs = JSON.parse(localStorage.getItem("userDocuments")) || [];
    setStats((prev) => ({
      ...prev,
      documents: userDocs.length, // ✅ real document count
    }));
  }, []);

  return (
    <div className="div-fastStatistics">
      <div className="div-profileBoxTitle">
        <h3>{title}</h3>
      </div>

      <div className="div-stats">
        <div className="div-profileBoxText">
          <h4>{headingOne}</h4>
          <h4>{headingTwo}</h4>
          <h4>{headingThree}</h4>
          <h4>{headingFour}</h4>
        </div>

        <div className="div-profileBoxNumber">
          <p>5</p> {/* total apps */}
          <p>2</p> {/* accepted */}
          <p>1</p> {/* pending */}
          <p>{stats.documents}</p> {/* ✅ dynamic docs count */}
        </div>
      </div>
    </div>
  );
}