import React, { useState, useEffect } from "react";
import {
  Menu,
  X,
  User,
  FileText,
  CreditCard,
  BarChart2,
  Bell,
  Heart,
  Settings,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import "./Sidebar.css";
import { auth, db } from "../../../Firebase/firebase";
import { doc, getDoc } from "firebase/firestore";

const Sidebar = ({ active, setActive }) => {
  const [open, setOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      const currentUser = auth.currentUser;
      if (!currentUser) return;
      try {
        const docRef = doc(db, "registrations", currentUser.uid);
        const snap = await getDoc(docRef);
        if (snap.exists()) {
          setUserData(snap.data());
        }
      } catch (err) {
        console.error("Gabim gjatë marrjes së të dhënave të përdoruesit:", err);
      }
    };
    fetchUserData();
  }, []);

  const menuItems = [
    { title: "Profili im", icon: <User size={18} /> },
    { title: "Aplikimet", icon: <FileText size={18} /> },
    { title: "Pagesat", icon: <CreditCard size={18} /> },
    { title: "Statistikat", icon: <BarChart2 size={18} /> },
    { title: "Njoftimet", icon: <Bell size={18} /> },
    { title: "Të preferuarat", icon: <Heart size={18} /> },
    { title: "Cilësimet", icon: <Settings size={18} /> },
  ];

  const name = userData ? `${userData.name || ""} ${userData.surname || ""}`.trim() : "Ngarkim...";
  const role = userData?.role || "Student";
  const avatar = name ? name.charAt(0).toUpperCase() : "?";

  return (
    <>
      {!isDesktop && (
        <div className="mobile-header">
          <div className="user-section">
            <div className="avatar">{avatar}</div>
            <div className="user-info">
              <h3>{name}</h3>
              <p>{role}</p>
            </div>
          </div>
          <button onClick={() => setOpen(!open)}>
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      )}

      <AnimatePresence>
        {(open || isDesktop) && (
          <motion.aside
            initial={{ x: -260 }}
            animate={{ x: 0 }}
            exit={{ x: -260 }}
            transition={{ duration: 0.3 }}
            className={`sidebar ${open ? "open" : ""}`}
          >
            <div>
              <div className="user-section">
                <div className="avatar">{avatar}</div>
                <div className="user-info">
                  <h3>{name}</h3>
                  <p>{role}</p>
                </div>
              </div>
              <hr />
              <nav className="sidebar-menu">
                {menuItems.map((item) => (
                  <a
                    key={item.title}
                    onClick={() => {
                      setActive(item.title);
                      if (!isDesktop) setOpen(false);
                    }}
                    className={active === item.title ? "active" : ""}
                  >
                    {item.icon}
                    <span>{item.title}</span>
                  </a>
                ))}
              </nav>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;