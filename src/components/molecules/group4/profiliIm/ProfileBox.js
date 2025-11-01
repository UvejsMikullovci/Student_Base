import React from "react";
import "./ProfileBox.css";

export default function ProfileBox({ profile, src, name, email, role, button, onButtonClick }) {
  return (
    <div className="div-profileBox">
      <div className="div-profileBoxTitle">
        {src ? (
          <img src={src} alt="Profile" className="profile-photo" />
        ) : (
          <h1>{profile}</h1>
        )}
      </div>
      <h2>{name}</h2>
      <p>{email}</p>
      <p>{role}</p>
      <button onClick={onButtonClick}>{button}</button>
    </div>
  );
}