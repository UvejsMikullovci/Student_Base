import React from "react";
import "./StatisticsLanding.css";
import StatisticsBasicDiv from "../../../molecules/group4/statisticsDiv/StatisticsBasicDiv";

function StatisticsLanding() {
  return (
    <div>
      <div className="statistics-text">
        <h2>Statistikat</h2>
        <p>Shiko performancën dhe progresionin tënd</p>
      </div>

      <div className="statistics-container">
        <StatisticsBasicDiv
          value="8.6"
          label="Mesatarja juaj"
          change="+0.4"
          changeColor="text-green-600"
          iconName="TrendingUp"
        />
        <StatisticsBasicDiv
          value="3/45"
          label="Vendi në klasë"
          change="+2"
          changeColor="text-green-600"
          iconName="Users"
        />
        <StatisticsBasicDiv
          value="12/15"
          label="Objektivat e arritura"
          change="+0.4"
          changeColor="text-green-600"
          iconName="Target"
        />
        <StatisticsBasicDiv
          value="126h"
          label="Orë studimi"
          change="+18h"
          changeColor="text-green-600"
          iconName="Clock"
        />
      </div>
    </div>
  );
}

export default StatisticsLanding;
