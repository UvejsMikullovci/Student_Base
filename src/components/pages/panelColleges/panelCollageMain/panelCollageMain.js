import React, { useState } from "react";
import { User, FileText, Home, Settings } from "lucide-react";
import Sidebar from "../../../organisms/group5/Sidebar";
import PanelCollageProfile from "../panelCollageProfile/panelCollage";
import PanelCollageProfessors from "../panelCollageProfessors/panelCollageProfessors";
import PanelCollageAplicants from "../panelCollageAplicants/panelCollageAplicants";
import PanelCollageSettings from "../panelCollageSettings/panelCollageSettings";
import "./panelCollageMain.css";
import "../../../organisms/group5/Sidebar.css";

export default function PanelDormsMainContainer() {
  const [activePanel, setActivePanel] = useState("Profili im");

  const dormMenu = [
    { title: "Profili im", icon: <User size={18} /> },
    { title: "Koviktet", icon: <Home size={18} /> },
    { title: "Aplikimet", icon: <FileText size={18} /> },
    { title: "Cilësimet", icon: <Settings size={18} /> },
  ];

  const renderActivePanelDorm = () => {
    switch (activePanel) {
      case "Profili im":
        return <PanelCollageProfile />;
      case "Koviktet":
        return <PanelCollageProfessors />;
      case "Aplikimet":
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