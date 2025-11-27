import React from "react";
import IconCard from "../../atoms/Homepage/IconCard";
import "./WhyChooseGrid.css";
import { FaSearch, FaChartLine, FaShieldAlt, FaMedal } from "react-icons/fa";

export function WhyChooseGrid(){
    return(
        <div className="why-grid">
            <IconCard
            icon={<FaSearch/>}
            title="Kerko lehte"
            description="Gjej kolegjet dhe programet që të përshtaten  më së miri."
            />
             <IconCard
            icon={<FaChartLine/>}
            title="Statistika të detajuara"
            description="Shiko statistikat dhe krahasojmë kolegjet dhe programet."
            />
             <IconCard
            icon={<FaShieldAlt/>}
            title="I sigurt dhe i besueshëm"
            description="Të dhënat tua janë të sigurta dhe të mbrojtura."
            />
             <IconCard
            icon={<FaMedal/>}
            title="Cilësi e garantuar"
            description="Punojmë vetëm me institucione të akredituara."
            />
        </div>
    );
}