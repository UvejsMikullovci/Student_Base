import React from "react";
import "../../organisms/group5/Sidebar.css"

const UserAvatar = ({ name, role }) => {
  return (
    <div className="flex items-center gap-3">
      <div className="bg-red-100 text-red-600 p-3 rounded-full">
        <i className="fa-solid fa-graduation-cap"></i>
      </div>
      <div>
        <p className="text-sm font-medium">{name}</p>
        <p className="text-xs text-gray-500">{role}</p>
      </div>
    </div>
  );
};

export default UserAvatar;
