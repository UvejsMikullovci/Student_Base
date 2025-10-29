import React from "react";

const IconText = ({ icon, text }) => {
  return (
    <div className="icon-text">
      <span className="icon">{icon}</span>
      <span>{text}</span>
    </div>
  );
};

export default IconText;
