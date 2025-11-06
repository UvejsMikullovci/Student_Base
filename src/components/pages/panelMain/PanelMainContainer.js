import React, { useState } from "react";
import {
  User,
  FileText,
  CreditCard,
  BarChart2,
  Bell,
  Heart,
  Settings,
} from "lucide-react";
import PanelProfile from "../group4/panelProfile/Profile";
import PanelApplications from "../group4/panelAplications/panelAplications";
import PanelPayments from "../group4/panelPayment/Payments";
import PanelStatistics from "../group4/panelStatistics/StatisticsPage";
import PanelNotifications from "../group4/panelNotifications/PanelNotifications";
import PanelFavorites from "../group4/panelFavortied/favorited";
import PanelSettings from "../group4/panelSettings/settings";
import Sidebar from "../../organisms/group5/Sidebar";
import "./PanelMainContainer.css";

export default function PanelMainContainer() {
  const [activePanel, setActivePanel] = useState("Profili im");

  // Define your sidebar menu for the student panel
  const studentMenu = [
    { title: "Profili im", icon: <User size={18} /> },
    { title: "Aplikimet", icon: <FileText size={18} /> },
    { title: "Pagesat", icon: <CreditCard size={18} /> },
    { title: "Statistikat", icon: <BarChart2 size={18} /> },
    { title: "Njoftimet", icon: <Bell size={18} /> },
    { title: "Të preferuarat", icon: <Heart size={18} /> },
    { title: "Cilësimet", icon: <Settings size={18} /> },
  ];

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
        <Sidebar
          active={activePanel}
          setActive={setActivePanel}
          menuItems={studentMenu}
          roleLabel="Student"
          profileKey="student"
          storagePath="registrations"
        />
      </div>
      <div className="panel-content">{renderActivePanel()}</div>
    </div>
  );
}