import React, { useState } from "react";
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
const StatisticsBarChart = ({ data, dataKey, barKey, title }) => (
  <div className="chart-card bar-chart">
    <h3 className="chart-title">{title}</h3>
    <div className="chart-container">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
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
          <Tooltip
            contentStyle={{
              borderRadius: "8px",
              border: "none",
              boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
            }}
          />
          <Legend wrapperStyle={{ paddingTop: "10px" }} />
          <Bar
            dataKey={barKey}
            fill="#DF4C4A"
            barSize={40}
            radius={[5, 5, 0, 0]}
          />{" "}
        </BarChart>
      </ResponsiveContainer>
    </div>
  </div>
);
export default StatisticsBarChart;
