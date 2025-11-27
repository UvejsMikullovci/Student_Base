// NavLink.jsx
import React from "react";
import { NavLink as RouterNavLink } from "react-router-dom";
import "./NavLink.css";

const NavLink = ({ label, to }) => {
  return (
    <RouterNavLink
      to={to}
      className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
    >
      {label}
    </RouterNavLink>
  );
};

export default NavLink;
