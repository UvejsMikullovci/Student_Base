import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import UserAvatar from "../../atoms/group5/UserAvatar";
import SidebarMenu from "../../molecules/group5/SidebarMenu";
import { motion, AnimatePresence } from "framer-motion";

const Sidebar = () => {
  // Dummy user (replace later with your real auth data)
  const [user] = useState({
    name: "Erion Veliaj",
    role: "Student",
  });

  const [open, setOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {/* MOBILE HEADER */}
      {!isDesktop && (
        <div className="sidebar-header">
          <UserAvatar name={user.name} role={user.role} />
          <button onClick={() => setOpen(!open)}>
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      )}

      {/* SIDEBAR */}
      <AnimatePresence>
        {(open || isDesktop) && (
          <motion.aside
            initial={{ x: -260 }}
            animate={{ x: 0 }}
            exit={{ x: -260 }}
            transition={{ duration: 0.3 }}
            className={`sidebar ${open ? "open" : ""}`}
          >
            <div className="sidebar-top">
              <UserAvatar name={user.name} role={user.role} />
              <hr />
              <SidebarMenu active="Profili im" />
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;