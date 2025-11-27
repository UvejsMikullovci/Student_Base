import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#4F90FF", "#2ECC71", "#FFA500", "#9B59B6"];

const StatisticsPieChart = ({ title, data, dataKey, nameKey }) => (
  <div>
    <h1>{title}</h1>
    <div style={{ width: "100%", height: 300 }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data.map((d) => ({
              ...d,
              [dataKey]:
                typeof d[dataKey] === "string"
                  ? parseFloat(d[dataKey])
                  : d[dataKey],
            }))}
            dataKey={dataKey}
            nameKey={nameKey}
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#8884d8"
            label={(entry) => `${entry[nameKey]}: ${entry[dataKey]}`}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  </div>
);

export default StatisticsPieChart;
