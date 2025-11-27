import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
const StatisticsLineChart = ({ data, dataKey, lineKey, title }) => (
  <div className="chart-card line-chart">
    <h3 className="chart-title">{title}</h3>
    <div className="chart-container">
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
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
          <Line
            type="monotone"
            dataKey={lineKey}
            stroke="#DF4C4A"
            strokeWidth={2}
            dot={{ r: 4, strokeWidth: 2 }}
            activeDot={{ r: 6 }}
            cx="50%"
            cy="50%"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  </div>
);
export default StatisticsLineChart;
