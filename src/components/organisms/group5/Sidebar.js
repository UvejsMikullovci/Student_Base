import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import UserAvatar from "../../atoms/group5/UserAvatar";
import SidebarMenu from "../../molecules/group5/SidebarMenu";
import { motion, AnimatePresence } from "framer-motion";
import "../../organisms/group5/Sidebar.css"

const Sidebar = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="p-4 md:hidden flex justify-between items-center bg-white shadow">
        <UserAvatar name="Erion Veliaj" role="Student" />
        <button onClick={() => setOpen(!open)}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <AnimatePresence>
        {(open || window.innerWidth >= 768) && (
          <motion.aside
            initial={{ x: -250 }}
            animate={{ x: 0 }}
            exit={{ x: -250 }}
            transition={{ duration: 0.3 }}
            className="bg-[#FFFDF9] border-r border-gray-100 h-screen w-64 p-6 hidden md:flex md:flex-col md:justify-between fixed md:relative"
          >
            <div className="flex flex-col gap-6">
              <UserAvatar name="Erion Veliaj" role="Student" />
              <div className="border-t border-gray-200" />
              <SidebarMenu active="Profili im" />
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;
