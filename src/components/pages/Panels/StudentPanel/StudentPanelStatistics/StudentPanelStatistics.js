import React, { useState, useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "../../../../../Firebase/firebase";

import StatisticsLanding from "../../../../organisms/Panels/StudentPanel/StudentPanelStatistics/StatisticsLanding";
import StatisticsLineChart from "../../../../molecules/Panels/StudentPanel/CollagePanelStatistics/StatisticsLineChart";
import StatisticsBarChart from "../../../../molecules/Panels/StudentPanel/CollagePanelStatistics/StatisticsBarChart";
import StatisticsPieChart from "../../../../molecules/Panels/StudentPanel/CollagePanelStatistics/StatisticsPieChart";
import StatisticsBarHorizontal from "../../../../molecules/Panels/StudentPanel/CollagePanelStatistics/StatisticsBarHorizontal";

import "./StudentPanelStatistics.css";

function StudentPanelStatistics() {
  const auth = getAuth();
  const userId = auth.currentUser?.uid;

  const statsCollection = userId
    ? collection(db, "registrations", userId, "stats")
    : null;

  const [progressData, setProgressData] = useState([]);
  const [barData, setBarData] = useState([]);
  const [pieData, setPieData] = useState([]);

  useEffect(() => {
    if (!userId) return;

    const unsubscribe = onSnapshot(statsCollection, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setProgressData(data.filter((d) => d.type === "progress"));
      setBarData(data.filter((d) => d.type === "bar"));
      setPieData(data.filter((d) => d.type === "pie"));
    });

    return () => unsubscribe();
  }, [userId]);

  if (!userId) return <p>Please log in to view statistics.</p>;

  const EmptyMessage = ({ text }) => (
    <p className="no-data-message">{text}</p>
  );

  return (
    <div>
      <div className="statistics-line-chart-section">
        <StatisticsLanding />
      </div>

      <div className="statistics-charts-section">
        <div className="statistics-line-chart">
          {progressData.length > 0 ? (
            <StatisticsLineChart
              title="Progresi i notave"
              data={progressData}
              dataKey="name"
              lineKey="Nota mesatare"
            />
          ) : (
            <EmptyMessage text="Nuk ka të dhëna për progresin e notave." />
          )}
        </div>

        <div className="statistics-bar-chart">
          {progressData.length > 0 ? (
            <StatisticsBarChart
              title="Progresi i notave"
              data={progressData}
              dataKey="name"
              barKey="Nota mesatare"
            />
          ) : (
            <EmptyMessage text="Nuk ka të dhëna për progresin e notave." />
          )}
        </div>
      </div>

      <div className="statistics-charts-section">
        <div className="statistics-line-chart">
          {barData.length > 0 ? (
            <StatisticsBarHorizontal
              title="Krahasim me klasën"
              data={barData}
              dataKey="name"
              barKey="Nota mesatare"
            />
          ) : (
            <EmptyMessage text="Nuk ka të dhëna për krahasim me klasën." />
          )}
        </div>

        <div className="statistics-bar-chart">
          {pieData.length > 0 ? (
            <StatisticsPieChart
              title="Shpërndarja e aktiviteteve"
              data={pieData}
              dataKey="value"
              nameKey="name"
            />
          ) : (
            <EmptyMessage text="Nuk ka të dhëna për shpërndarjen e aktiviteteve." />
          )}
        </div>
      </div>
    </div>
  );
}

export default StudentPanelStatistics;
