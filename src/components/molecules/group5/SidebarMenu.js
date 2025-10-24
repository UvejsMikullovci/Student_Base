import React from "react";
import SidebarLink from "../../atoms/group5/SidebarLink";
import Icon from "../../atoms/group5/Icon";
import "../../organisms/group5/Sidebar.css"

const SidebarMenu = ({ active }) => {
  const links = [
    { label: "Profili im", icon: "User" },
    { label: "Aplikimet", icon: "FileText" },
    { label: "Pagesat", icon: "CreditCard" },
    { label: "Statistikat", icon: "BarChart2" },
    { label: "Njoftimet", icon: "Bell" },
    { label: "Të preferuarat", icon: "Heart" },
    { label: "Cilësimet", icon: "Settings" },
  ];

  return (
    <div className="flex flex-col gap-1">
      {links.map((link) => (
        <SidebarLink
          key={link.label}
          label={link.label}
          icon={<Icon name={link.icon} />}
          active={active === link.label}
        />
      ))}
    </div>
  );
};

export default SidebarMenu;
