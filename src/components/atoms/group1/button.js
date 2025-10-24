// src/components/atoms/group1/Button.js
import React from "react";

export default function button({ label, variant = "primary", onClick }) {
  const styles = {
    primary: {
      backgroundColor: "#DF4C4A",
      color: "#fff",
      border: "none",
      padding: "10px 20px",
      borderRadius: "8px",
      cursor: "pointer",
      fontWeight: "bold",
    },
    secondary: {
      backgroundColor: "#FFFCF6",
      color: "#DF4C4A",
      border: "2px solid #DF4C4A",
      padding: "10px 20px",
      borderRadius: "8px",
      cursor: "pointer",
      fontWeight: "bold",
    },
  };

  return (
    <button style={styles[variant]} onClick={onClick}>
      {label}
    </button>
  );
}
