import React from "react";
import "./FilterTabs.css";

const FilterTabs = ({ activeFilter, setActiveFilter, applications }) => {
  const counts = {
    all: applications.length,
    pranuar: applications.filter((a) => a.status === "Pranuar").length,
    nëpritje: applications.filter((a) => a.status === "Në pritje").length,
    refuzuar: applications.filter((a) => a.status === "Refuzuar").length,
  };

  return (
    <div className="filter-tabs">
      <div className="tabs-inner">
        <button
          className={activeFilter === "all" ? "active" : ""}
          onClick={() => setActiveFilter("all")}
        >
          Të gjitha ({counts.all})
        </button>
        <button
          className={activeFilter === "pranuar" ? "active" : ""}
          onClick={() => setActiveFilter("pranuar")}
        >
          Pranuar ({counts.pranuar})
        </button>
        <button
          className={activeFilter === "nëpritje" ? "active" : ""}
          onClick={() => setActiveFilter("nëpritje")}
        >
          Në pritje ({counts.nëpritje})
        </button>
        <button
          className={activeFilter === "refuzuar" ? "active" : ""}
          onClick={() => setActiveFilter("refuzuar")}
        >
          Refuzuar ({counts.refuzuar})
        </button>
      </div>
    </div>
  );
};

export default FilterTabs;