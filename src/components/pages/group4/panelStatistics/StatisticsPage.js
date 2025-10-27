import React from "react";
import StatisticsLanding from "../../../organisms/group4/StatisticsLanding/StatisticsLanding";
import StatisticsLineChart from "../../../molecules/group4/statisticsDiv/StatisticsLineChart";
import StatisticsBarChart from "../../../molecules/group4/statisticsDiv/StatisticsBarChart";
import StatisticsPieChart from "../../../molecules/group4/statisticsDiv/StatisticsPieChart";
import StatisticsBarHorizontal from "../../../molecules/group4/statisticsDiv/StatisticsBarHorizontal";
import "./StatisticsPage.css";
const progressData = [
  { name: "Shtator", "Nota mesatare": 7.5 },
  { name: "Tetor", "Nota mesatare": 8.0 },
  { name: "Nëntor", "Nota mesatare": 7.8 },
  { name: "Dhjetor", "Nota mesatare": 8.5 },
  { name: "Janar", "Nota mesatare": 8.7 },
  { name: "Shkurt", "Nota mesatare": 9.0 },
];

const subjectData = [
  { name: "Matematikë", Nota: 8.5 },
  { name: "Fizikë", Nota: 7.9 },
  { name: "Anglisht", Nota: 9.4 },
  { name: "Kimi", Nota: 7.8 },
  { name: "Informatikë", Nota: 9.7 },
];
const barData = [
  { name: "Ju", "Nota mesatare": 9 },
  { name: "Mesatare klase", "Nota mesatare": 8 },
];

const pieData = [
  { name: "Teste", value: 45 },
  { name: "Detyra", value: 30 },
  { name: "Projekte", value: 15 },
  { name: "Prezantime", value: 10 },
];
function StatisticsPage() {
  return (
    <div>
      <div className="statistics-line-chart-section">
        <StatisticsLanding />
      </div>
      <div className="statistics-charts-section">
        <div className="statistics-line-chart">
          <StatisticsLineChart
            title="Progresi i notave"
            data={progressData}
            dataKey="name"
            lineKey="Nota mesatare"
          />
        </div>
        <div className="statistics-bar-chart">
          <StatisticsBarChart
            title="Progresi i notave"
            data={progressData}
            dataKey="name"
            barKey="Nota mesatare"
          />
        </div>
      </div>
      <div className="statistics-charts-section">
        <div className="statistics-line-chart">
          <StatisticsBarHorizontal
            title="Krahasim me klasën"
            data={barData}
            dataKey="name"
            barKey="Nota mesatare"
          />
        </div>
        <div className="statistics-bar-chart">
          <StatisticsPieChart
            title="Shpërndarja e aktiviteteve"
            data={pieData}
            dataKey="value"
            nameKey="name"
          />
        </div>
      </div>
    </div>
  );
}

export default StatisticsPage;
