import React from "react";
import { User, FileText, CreditCard, BarChart2, Bell, Heart } from "lucide-react";

const SidebarMenu = ({ active }) => {
  const menuItems = [
    { title: "Profili im", icon: <User size={18} /> },
    { title: "Aplikimet", icon: <FileText size={18} /> },
    { title: "Pagesat", icon: <CreditCard size={18} /> },
    { title: "Statistikat", icon: <BarChart2 size={18} /> },
    { title: "Njoftimet", icon: <Bell size={18} /> },
    { title: "Të preferuarat", icon: <Heart size={18} /> },
  ];

  return (
    <nav className="sidebar-menu">
      {menuItems.map((item) => (
        <a
          key={item.title}
          href="#"
          className={active === item.title ? "active" : ""}
        >
          {item.icon}
          <span>{item.title}</span>
        </a>
      ))}
    </nav>
  );
};

export default SidebarMenu;