import React from "react";
import "./NavLink.css";

const NavLink = ({ label, href, active }) => {
  return (
    <a href={href} className={`nav-link ${active ? "active" : ""}`}>
      {label}
    </a>
  );
};

export default NavLink;
