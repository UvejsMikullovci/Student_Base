import React from "react";
import { Link } from "react-router-dom"; // ✅ Use React Router Link for navigation

const FooterColumn = ({ title, links }) => {
  return (
    <div className="footer-column">
      <h4>{title}</h4>
      <ul>
        {links.map((link, index) => (
          <li key={index}>
            <Link to={link.href}>{link.label}</Link> {/* ✅ React Router link */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FooterColumn;
