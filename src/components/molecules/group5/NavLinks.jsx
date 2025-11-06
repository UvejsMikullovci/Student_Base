// src/components/molecules/group5/NavLinks.jsx
import React from "react";
import NavLink from "../../atoms/group5/NavLink";
import "./NavLinks.css";

const NavLinks = () => {
  const links = [
    { label: "Ballina", to: "/" },
    { label: "Kolegjët", to: "/kolegjte" },
    { label: "Programet", to: "/programet" },
    { label: "Çmimet", to: "/cmimet" },
    { label: "Konviktet", to: "/konviktet" },
    { label: "Rreth Nesh", to: "/rreth-nesh" },
    { label: "Kontakti", to: "/kontakti" }

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
