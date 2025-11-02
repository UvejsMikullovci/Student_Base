import React from "react";
import "./IconCircle.css";
import { FaSearch, FaInfoCircle, FaHandsHelping } from "react-icons/fa";

const IconCircle = ({ icon }) => {
  const renderIcon = () => {
    switch (icon) {
      case "search":
        return <FaSearch />;
      case "info":
        return <FaInfoCircle />;
      case "support":
        return <FaHandsHelping />;
      default:
        return <FaInfoCircle />;
    }
  };

  return <div className="icon-circle">{renderIcon()}</div>;
};

export default IconCircle;