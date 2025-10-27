import React from "react";
import {HowItWorksCard} from "../../atoms/group1/HowItWorksCard";
import "./HowItWorks.css";
import { FaSearch, FaChartLine, FaShieldAlt, FaMedal, FaGraduationCap } from "react-icons/fa";

export function HowItWorks(){
    return(
        <div className="how-grid">
            <HowItWorksCard
            icon={<FaSearch/>}
            title="1. Kërko dhe eksploro"
            description="Shfleto kolegjet dhe programet që përshtaten me interesat dhe objektivat tua."
            />
             <HowItWorksCard
            icon={<FaChartLine/>}
            title="2. Krahaso opsionet"
            description="Përdor mjetet tona për të krahasuar kolegjet bazuar në çmim, program dhe vlerësime."
            />
             <HowItWorksCard
            icon={<FaGraduationCap/>}
            title="3. Apliko me besim"
            description="Dërgo aplikimin tënd drejtpërdrejt dhe ndiq progresin në kohë reale."
            />
        </div>
    );
}