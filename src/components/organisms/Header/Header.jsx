import React from "react";
import "./Header.css";
import Brand from "../../molecules/FooterAndHeader/Brand.jsx";
import NavLinks from "../../molecules/FooterAndHeader/NavLinks";
import Button from "../../atoms/FooterAndHeader/Button.jsx";
import { useAuth } from "../../../context/AuthContext";

const Header = () => {
  const { user, logout } = useAuth();

  const getPanelPath = () => {
    if (!user || !user.role) return "/panel";
    switch (user.role) {
      case "Student":
        return "/StudentPanel";
      case "Professor":
        return "/ProfessorPanel";
      case "College":
        return "/CollegePanel";
      case "Landlord":
        return "/LandlordPanel";
      default:
        return "/StudentPanel";
    }
  };

  return (
    <header className="navbar">
      <div className="container">
        <Brand />
        <div className="nav-right">
          <NavLinks />
          <div className="cta">
            {user ? (
              <>
                <a href={getPanelPath()}>
                  <Button label="Paneli Im" />
                </a>
                <button
                  className="logout-btn"
                  onClick={logout}
                  style={{
                    background: "transparent",
                    border: "none",
                    color: "#444",
                    marginLeft: "10px",
                    cursor: "pointer",
                    fontSize: "15px",
                  }}
                >
                  Dalje
                </button>
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