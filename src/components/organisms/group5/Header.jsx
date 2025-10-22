import React from "react";
import "./Header.css";
import Brand from "../../molecules/group5/Brand";
import NavLinks from "../../molecules/group5/NavLinks";
import Button from "../../atoms/group5/Button";

const Header = () => {
  return (
    <header className="navbar">
      <div className="container">
        <Brand />
        <NavLinks />
        <div className="cta">
          <Button label="Paneli im" />
        </div>
      </div>
    </header>
  );
};

export default Header;
