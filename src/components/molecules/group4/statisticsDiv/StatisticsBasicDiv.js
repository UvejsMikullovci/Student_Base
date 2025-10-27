import React from "react";
import { TrendingUp, Clock, Target, Users, Award } from "lucide-react";

const IconMap = {
  TrendingUp,
  Clock,
  Target,
  Users,
  Award,
};

const StatisticsBasicDiv = ({
  value,
  label,
  change,
  changeColor,
  iconName,
}) => {
  const IconToRender = IconMap[iconName] || TrendingUp;

  return (
    <div className="card-container-statistics">
      <div className="card-header-statistics">
        <div className="icon-box-statistics">
          <IconToRender className="w-6 h-6" aria-hidden="true" />
        </div>
        <span className={`change-text ${changeColor}`}>{change}</span>
      </div>

      <div className="value-section-statistics">
        <p className="main-value-text-statistics">{value}</p>
      </div>

      <div className="label-section-statistics">
        <p className="label-text-statistics">{label}</p>
      </div>
    </div>
  );
};

export default StatisticsBasicDiv;
