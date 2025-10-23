import React from "react";

const IconButton = ({ icon, link }) => {
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="footer-icon"
    >
      <i className={icon}></i>
    </a>
  );
};

export default IconButton;
