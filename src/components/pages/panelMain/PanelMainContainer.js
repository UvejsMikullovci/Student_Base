import React, { useState } from "react";
import PanelProfile from "../group4/panelProfile/Profile";
import PanelApplications from "../group4/panelAplications/panelAplications";
import PanelPayments from "../group4/panelPayment/Payments";
import PanelStatistics from "../group4/panelStatistics/StatisticsPage";
import PanelNotifications from "../group4/panelNotifications/PanelNotifications";
import PanelFavorites from "../group4/panelFavortied/favorited";
import PanelSettings from "../group4/panelSettings/settings";
import Sidebar from "../../organisms/group5/Sidebar";
import "./PanelMainContainer.css"; // add this new css

export default function PanelMainContainer() {
  const [activePanel, setActivePanel] = useState("Profili im");

  const renderActivePanel = () => {
    switch (activePanel) {
      case "Profili im":
        return <PanelProfile />;
      case "Aplikimet":
        return <PanelApplications />;
      case "Pagesat":
        return <PanelPayments />;
      case "Statistikat":
        return <PanelStatistics />;
      case "Njoftimet":
        return <PanelNotifications />;
      case "Të preferuarat":
        return <PanelFavorites />;
      case "Cilësimet":
        return <PanelSettings />;
      default:
        return <PanelProfile />;
    }
  };

  return (
    <div className="panel-main">
      <div className="sidebar-container">
      <Sidebar active={activePanel} setActive={setActivePanel} />
      </div>
      <div className="panel-content">{renderActivePanel()}</div>
    </div>
  );
}