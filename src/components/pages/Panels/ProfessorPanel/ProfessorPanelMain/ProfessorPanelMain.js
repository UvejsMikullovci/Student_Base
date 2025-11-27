import React, { useState } from "react";
import {
  User,
  Megaphone,
  GraduationCap,
  Settings,
  PencilLine,
} from "lucide-react";
import Sidebar from "../../../../organisms/Sidebar/Sidebar";
import PanelProfProfile from "../ProfessorPanelProfile/ProfessorPanelProfile";
import PanelProfStudents from "../ProfessorPanelStudents/ProfessorPanelStudents";
import PanelProfGrades from "../ProfessorPanelGrades/ProfessorPanelGrades";
import PanelProfAnnouncements from "../ProfessorPanelAnnouncements/ProfessorPanelAnnouncments";
import PanelProfSettings from "../ProfessorPanelSettings/ProfessorPanelSettings";
import "../../../../organisms/Sidebar/Sidebar";
import "./ProfessorPanelMain.css";

export default function ProfessorPanelMain() {
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
      case "Cilesimet":
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
          roleLabel="Profesor"
          profileKey="dorms"
          storagePath="registrations"
        />
      </div>
      <div className="panel-content">{renderActivePanelDorm()}</div>
    </div>
  );
}
