import React from "react";
import "./Header.css";
import Brand from "../../molecules/group5/Brand";
import NavLinks from "../../molecules/group5/NavLinks";
import Button from "../../atoms/group5/Button.jsx";
import PanelAplications from "../../pages/group4/panelAplications/panelAplications.js";

const Header = () => {
  return (
    <header className="navbar">
      <div className="container">
        <Brand />
        <div className="nav-right">
          <NavLinks />
          <div className="cta">
            <a href="/panel-aplications"><Button label="Paneli im" /></a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;