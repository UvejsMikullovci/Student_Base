import React from "react";
import {useState, useEffect, useMemo} from "react";
import ApplicationsHeader from "../../../organisms/group4/panelAplications/AplicationHeader";
import StatsRow from "../../../molecules/group4/panelAplications/StatsRow";
import FilterTabs from "../../../organisms/group4/panelAplications/FilterTabs";
import ApplicationsList from "../../../molecules/group4/panelAplications/ApplicationsList";
import SideBar from "../../../organisms/group5/Sidebar"
import "./panelAplications.css";


const PanelAplications = () => {
  const [activeFilter, setActiveFilter] = useState("all");

  const applicationsData = [
    {
      university: "Universiteti i Tiranës",
      program: "Inxhinieri Informatike - Bachelor",
      date: "15 Tetor 2025",
      status: "Pranuar",
    },
    {
      university: "Universiteti Politeknik",
      program: "Administrim Biznesi - Bachelor",
      date: "10 Tetor 2025",
      status: "Në pritje",
    },
    {
      university: "Kolegj Europian",
      program: "Marketing dhe Komunikim - Bachelor",
      date: "8 Tetor 2025",
      status: "Në pritje",
    },
    {
      university: "Universiteti Bujqësor",
      program: "Shkenca Kompjuterike - Bachelor",
      date: "5 Tetor 2025",
      status: "Refuzuar",
    },
    {
      university: "Universiteti i Prishtinës",
      program: "Arkitekturë - Bachelor",
      date: "2 Tetor 2025",
      status: "Pranuar",
    },
  ];

  const stats = useMemo(() => {
    const total = applicationsData.length;
    const accepted = applicationsData.filter((a) => a.status === "Pranuar").length;
    const pending = applicationsData.filter((a) => a.status === "Në pritje").length;
    const rejected = applicationsData.filter((a) => a.status === "Refuzuar").length;
    return { total, accepted, pending, rejected };
  }, [applicationsData]);

  const filteredData =
    activeFilter === "all"
      ? applicationsData
      : applicationsData.filter(
          (app) =>
            app.status.toLowerCase().replace(/\s/g, "") ===
            activeFilter.toLowerCase().replace(/\s/g, "")
        );

  return (


    
    <div className="panel-applications">
      <SideBar /> 
      <h1 className="applications-title">Aplikimet e mia</h1>
      <p className="applications-subtitle">
        Ndjek statusin e të gjitha aplikimeve tuaja
      </p>

      <StatsRow
        total={stats.total}
        accepted={stats.accepted}
        pending={stats.pending}
        rejected={stats.rejected}
      />
      

      <FilterTabs
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
        applications={applicationsData}
      />

      <ApplicationsList applications={filteredData} />
    </div>
  );
};

export default PanelAplications;