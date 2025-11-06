import React, { useState } from "react";
import { User, FileText, Home, Settings } from "lucide-react";
import Sidebar from "../../../organisms/group5/Sidebar";
import PanelDormsAplications from "../PanelDormsAplications/artikuTest";
import PanelDormsProfile from "../PanelDormsProfile/PanelDormsProfile";
import PanelDormsKonviktet from "../PanelDormsKonviktet/PanelDormsKonviktet";
import PanelDormsCilesimet from "../PanelDormsCilesimet/PanelDormsCilesimet";
import "./PanelDormsMain.css";
import "../../../organisms/group5/Sidebar.css";

export default function PanelDormsMainContainer() {
  const [activePanel, setActivePanel] = useState("Profili im");

  // 🏠 Sidebar menu for dorm panel
  const dormMenu = [
    { title: "Profili im", icon: <User size={18} /> },
    { title: "Koviktet", icon: <Home size={18} /> },
    { title: "Aplikimet", icon: <FileText size={18} /> },
    { title: "Cilësimet", icon: <Settings size={18} /> },
  ];

  // Render sections
  const renderActivePanelDorm = () => {
    switch (activePanel) {
      case "Profili im":
        return <PanelDormsProfile />;
      case "Koviktet":
        return <PanelDormsKonviktet />;
      case "Aplikimet":
        return <PanelDormsAplications />;
      case "Cilësimet":
        return <PanelDormsCilesimet />;
      default:
        return <PanelDormsProfile />;
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