import React from "react";
import "./Header.css";
import Brand from "../../molecules/group5/Brand";
import NavLinks from "../../molecules/group5/NavLinks";
import Button from "../../atoms/group5/Button.jsx";
import { useAuth } from "../../../context/AuthContext";

const Header = () => {
  const { user } = useAuth();

  return (
    <header className="navbar">
      <div className="container">
        <Brand />
        <div className="nav-right">
          <NavLinks />
          <div className="cta">
            {user ? (
              <>
                <a href="/panel">
                  <Button label="Paneli Im" />
                </a>
              </>
            ) : (
              <>
                <a href="/login">
                  <Button label="Sign In" />
                </a>
                <h1>/</h1>
                <a href="/register">
                  <Button label="Sign Up" />
                </a>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;