import React from "react";
import * as Icons from "lucide-react";
import "../../organisms/group5/Sidebar.css"

const Icon = ({ name, size = 20, color = "currentColor" }) => {
  const LucideIcon = Icons[name];
  return <LucideIcon size={size} color={color} />;
};

export default Icon;
