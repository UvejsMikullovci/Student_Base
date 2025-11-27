import React from "react";
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaClock } from "react-icons/fa";
import "./ContactDetails.css";

function InfoCard({ icon, title, children }) {
  return (
    <div className="info-card">
      <div className="info-icon">{icon}</div>
      <h4 className="info-title">{title}</h4>
      <p className="info-text">{children}</p>
    </div>
  );
}

export default function ContactDetails() {
  return (
    <div className="contact-details">
      
    </div>
  );
}
