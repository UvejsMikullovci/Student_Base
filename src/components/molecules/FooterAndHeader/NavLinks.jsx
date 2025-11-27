// src/components/molecules/group5/NavLinks.jsx
import React from "react";
import NavLink from "../../atoms/FooterAndHeader/NavLink";
import "./NavLinks.css";

const NavLinks = () => {
  const links = [
    { label: "Ballina", to: "/" },
    { label: "Kolegjët", to: "/Colleges" },
    { label: "Programet", to: "/Programs" },
    { label: "Çmimet", to: "/Pricing" },
    { label: "Konviktet", to: "/Dorms" },
    { label: "Rreth Nesh", to: "/AboutUs" },
    { label: "Kontakti", to: "/Contact" }

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
