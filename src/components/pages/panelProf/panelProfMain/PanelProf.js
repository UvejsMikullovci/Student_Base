import React, { useState } from "react";
import { User, FileText, Home, Settings } from "lucide-react";
import Sidebar from "../../../organisms/group5/Sidebar";
import PanelProfProfile from "../panelProfProfile/PanelProfProfile";
import PanelProfStudents from "../panelProfStudents/PanelProfStudents";
import PanelProfGrades from "../panelProfGrades/PanelProfGrades";
import PanelProfAnnouncements from "../panelProfAnnouncements/PanelProfAnnouncements";
import PanelProfSettings from "../panelProfileSettings/PanelProfileSettings";
import "../../../organisms/group5/Sidebar.css";
import "../panelProf.css";

export default function PanelDormsMainContainer() {
  const [activePanel, setActivePanel] = useState("Profili im");

  // 🏠 Sidebar menu for dorm panel
  const dormMenu = [
    { title: "Profili im", icon: <User size={18} /> },
    { title: "Nxenesat", icon: <Home size={18} /> },
    { title: "Notimi", icon: <FileText size={18} /> },
    { title: "Njoftimet", icon: <Settings size={18} /> },
    { title: "Cilesimet", icon: <Settings size={18} /> },
  ];

  // Render sections
  const renderActivePanelDorm = () => {
    switch (activePanel) {
      case "Profili im":
        return <PanelProfProfile />;
      case "Nxenesat":
        return <PanelProfStudents />;
      case "Notimi":
        return <PanelProfGrades />;
      case "Njoftimet":
        return <PanelProfAnnouncements />;
      case "Cilësimet":
        return <PanelProfSettings />;
      default:
        return <PanelProfProfile />;
    }
  };

  return (
    <div className="panel-main">
      <div className="sidebar-container">
        <Sidebar
          active={activePanel}
          setActive={setActivePanel}
          menuItems={dormMenu}
          roleLabel="Konvikt"
          profileKey="dorms"
          storagePath="registrations"
        />
      </div>
      <div className="panel-content">{renderActivePanelDorm()}</div>
    </div>
  );
}