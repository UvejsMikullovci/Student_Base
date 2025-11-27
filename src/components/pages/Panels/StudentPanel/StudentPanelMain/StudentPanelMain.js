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

import PanelProfile from "../StudentPanelProfile/StudentPanelProfile";
import PanelApplications from "../StudentPanelApplications/StudentPanelApplications";
import PanelPayments from "../StudentPanelPayment/StudentPanelPayment";
import PanelStatistics from "../StudentPanelStatistics/StudentPanelStatistics";
import PanelNotifications from "../StudentPanelNotifications/StudentPanelNotifications";
import PanelFavorites from "../StudentPanelFavorited/StudentPanelFavorited";
import PanelSettings from "../StudentPanelSettings/StudentPanelSettings";

import Sidebar from "../../../../organisms/Sidebar/Sidebar";
import "./StudentPanelMain.css";

export default function StudentPanelMain() {
  const [activePanel, setActivePanel] = useState("Profili im");

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