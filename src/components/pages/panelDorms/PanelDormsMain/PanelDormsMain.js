import React, { useState } from "react";
import Sidebar from "../../../organisms/group5/Sidebar";
import PanelDormsAplications from "../PanelDormsAplications/artikuTest";
import PanelDormsProfile from "../PanelDormsProfile/PanelDormsProfile";
import PanelDormsKonviktet from "../PanelDormsKonviktet/PanelDormsKonviktet";
import PanelDormsCilesimet from "../PanelDormsCilesimet/PanelDormsCilesimet";
import "./PanelDormsMain.css";
import "../../../organisms/group5/Sidebar.css";

export default function PanelDormsMainContainer() {
    const [activePanel, setActivePanel] = useState("Profili im");

    const renderActivePanelDorm = () => {
        switch (activePanel) {
            case "Profili im":
                return <PanelDormsProfile />;
            case "Koviktet":
                return <PanelDormsKonviktet />;
            case "Aplikimet":
                return <PanelDormsAplications />;
            case "Cilesimet":
                return <PanelDormsCilesimet />;
        }
    };

    return (
        <div className="panel-main">
            <div className="sidebar-container">
                <Sidebar active={activePanel} setActive={setActivePanel} />
            </div>
            <div className="panel-content">{renderActivePanelDorm()}</div>
        </div>
    );
}
