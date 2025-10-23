import React from "react";
import NavLink from "../../atoms/group5/NavLink";
import "./NavLinks.css";


const NavLinks = () => {
  const links = [
    { label: "Ballina", href: "#", active: true },
    { label: "Kolegjët", href: "#" },
    { label: "Programet", href: "../../pages/group2/Programet" },
    { label: "Çmimet", href: "#" },
    { label: "Rreth Nesh", href: "#" },
    { label: "Kontakti", href: "#" },
  ];

  return (
    <nav className="nav-links">
      {links.map((link) => (
        <NavLink key={link.label} {...link} />
      ))}
    </nav>
  );
};

export default NavLinks;
