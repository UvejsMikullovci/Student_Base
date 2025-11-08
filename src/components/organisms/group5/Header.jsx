import React from "react";
import "./Header.css";
import Brand from "../../molecules/group5/Brand";
import NavLinks from "../../molecules/group5/NavLinks";
import Button from "../../atoms/group5/Button.jsx";
import { useAuth } from "../../../context/AuthContext";

const Header = () => {
  const { user, logout } = useAuth();

  const getPanelPath = () => {
    if (!user || !user.role) return "/panel";
    switch (user.role) {
      case "Student":
        return "/panel";
      case "Professor":
        return "/panelprof";
      case "College":
        return "/panelkolegj";
      case "Landlord":
        return "/paneldorms";
      default:
        return "/panel";
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