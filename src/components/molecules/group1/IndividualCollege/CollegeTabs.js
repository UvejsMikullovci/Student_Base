import React from "react";
import TabButton from "../../../atoms/group1/IndividualCollege/tabButton";

const CollegeTabs = ({ activeTab, setActiveTab }) => {
  return (
    <div className="tabs">
      <TabButton label="Pershkrim" active={activeTab === "pershkrim"} onClick={() => setActiveTab("pershkrim")} />
      <TabButton label="Programet" active={activeTab === "programet"} onClick={() => setActiveTab("programet")} />
      <TabButton label="Kontakti" active={activeTab === "kontakti"} onClick={() => setActiveTab("kontakti")} />
    </div>
  );
};

export default CollegeTabs;
