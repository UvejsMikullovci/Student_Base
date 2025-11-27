import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const StatisticsBarHorizontal = ({ title, data, dataKey, barKey }) => (
  <div className="chart-card bar-chart">
    <h1>{title}</h1>
    <div style={{ width: "100%", height: 300 }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 20, right: 10, left: 10, bottom: 5 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            stroke="#f0f0f0"
          />
          <XAxis dataKey={dataKey} tickLine={false} axisLine={false} />
          <YAxis
            domain={[0, 10]}
            allowDecimals={false}
            tickCount={5}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip />
          <Legend />
          <Bar
            dataKey={barKey}
            fill="#4F90FF"
            barSize={40}
            radius={[5, 5, 0, 0]}
            cx="50%"
            cy="50%"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  </div>
);

export default StatisticsBarHorizontal;
