import React, { useState } from "react";
import { User, FileText, Home, Settings } from "lucide-react";
import Sidebar from "../../../../organisms/Sidebar/Sidebar";
import PanelDormsAplications from "../PanelLandlordAplications/PanelLandlordAplications";
import PanelDormsProfile from "../PanelLandlordProfile/PanelLandlordProfile";
import PanelDormsKonviktet from "../PanelLandlordDorms/PanelLandlordDorms";
import PanelDormsCilesimet from "../PanelLandlordSettings/PanelLandlordSettings";
import "./PanelLandlordMain.css";
import "../../../../organisms/Sidebar/Sidebar.css";

export default function PanelLandlordMain() {
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