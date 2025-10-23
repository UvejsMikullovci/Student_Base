import React from "react";


export default function IconBox({ icon, title, description }) {
  return (
    <div className="icon-box">
      <div className="icon">{icon}</div>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}
