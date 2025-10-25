import React from "react";
import "../../organisms/group5/Sidebar.css"

const SidebarLink = ({ icon, label, active, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-3 w-full px-4 py-2 rounded-xl transition
        ${active ? "bg-red-100 text-red-600 font-medium" : "text-gray-700 hover:bg-gray-100"}
      `}
    >
      {icon}
      <span className="text-sm">{label}</span>
    </button>
  );
};

export default SidebarLink;
