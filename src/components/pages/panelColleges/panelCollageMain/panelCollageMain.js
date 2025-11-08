import React, { useState } from "react";
import { User, FileText, Home, Settings } from "lucide-react";
import Sidebar from "../../../organisms/group5/Sidebar";
import PanelCollageProfile from "../panelCollageProfile/panelCollage";
import PanelCollageProfessors from "../panelCollageProfesorss/panelCollageProfessors";
import PanelCollageAplicants from "../panelCollageAplicants/panelCollageAplicants";
import PanelCollageSettings from "../panelCollageSettings/panelCollageSettings";
import "./panelCollageMain.css";
import "../../../organisms/group5/Sidebar.css";

export default function PanelCollegeMainContainer() {
  const [activePanel, setActivePanel] = useState("Profili im");

  const collegeMenu = [
    { title: "Profili im", icon: <User size={18} /> },
    { title: "Profesorët", icon: <Home size={18} /> },
    { title: "Aplikantët", icon: <FileText size={18} /> },
    { title: "Cilësimet", icon: <Settings size={18} /> },
  ];

  const renderActivePanel = () => {
    switch (activePanel) {
      case "Profili im":
        return <PanelCollageProfile />;
      case "Profesorët":
        return <PanelCollageProfessors />;
      case "Aplikantët":
        return <PanelCollageAplicants />;
      case "Cilësimet":
        return <PanelCollageSettings />;
      default:
        return <PanelCollageProfile />;
    }
  };

  return (
    <div className="panel-main">
      <div className="sidebar-container">
        <Sidebar
          active={activePanel}
          setActive={setActivePanel}
          menuItems={collegeMenu}
          roleLabel="Kolegj"
          profileKey="college"
          storagePath="registrations"
        />
      </div>
      <div className="panel-content">{renderActivePanel()}</div>
    </div>
  );
}