import React, { useState } from "react";
import { User, FileText, Home, Settings } from "lucide-react";

// Assuming these custom components are using 'export default' in their respective files.
// If they are using 'named exports', you need to wrap them in curly braces:
// e.g. import { Sidebar } from "../../../../organisms/Sidebar/Sidebar";
import Sidebar from "../../../../organisms/Sidebar/Sidebar";
import PanelCollageProfile from "../PanelCollageProfile/panelCollageProfile";
import PanelCollageProfessors from "../PanelCollageProfesorss/panelCollageProfessors"; // Check the spelling of this folder/file name
import PanelCollageSettings from "../PanelCollageSettings/panelCollageSettings";

import "./panelCollageMain.css";
import "../../../../organisms/Sidebar/Sidebar.css";

export default function PanelCollegeMain() {
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
        // This case value must exactly match the title in collegeMenu
        return <PanelCollageProfessors />;

      case "Aplikantët":
        // If you have a separate file for applicants, replace it here
        return <PanelCollageProfile />;

      case "Cilësimet": // Corrected to match the menu item title
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