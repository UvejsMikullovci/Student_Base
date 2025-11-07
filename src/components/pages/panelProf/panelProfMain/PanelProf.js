import React, { useState } from "react";
import {
  User,
  Megaphone,
  GraduationCap,
  Settings,
  PencilLine,
} from "lucide-react";
import Sidebar from "../../../organisms/group5/Sidebar";
import PanelProfProfile from "../panelProfProfile/PanelProfProfile";
import PanelProfStudents from "../panelProfStudents/PanelProfStudents";
import PanelProfGrades from "../panelProfGrades/PanelProfGrades.js";
import PanelProfAnnouncements from "../panelProfAnnouncments/PanelProfAnnouncments";
import PanelProfSettings from "../panelProfileSettings/PanelProfileSettings";
import "../../../organisms/group5/Sidebar.css";
import "../panelProfMain/PanelProf.css";

export default function PanelDormsMainContainer() {
  const [activePanel, setActivePanel] = useState("Profili im");

  const dormMenu = [
    { title: "Profili im", icon: <User size={18} /> },
    { title: "Nxenesat", icon: <GraduationCap size={18} /> },
    { title: "Notimi", icon: <PencilLine size={18} /> },
    { title: "Njoftimet", icon: <Megaphone size={18} /> },
    { title: "Cilesimet", icon: <Settings size={18} /> },
  ];

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
