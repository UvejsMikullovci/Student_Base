import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import "./Sidebar.css";
import { auth, db } from "../../../Firebase/firebase";
import { doc, getDoc } from "firebase/firestore";

export default function Sidebar({
  active,
  setActive,
  menuItems = [],
  roleLabel = "User",
  profileKey = "defaultProfile",
  storagePath = "registrations",
}) {
  const [open, setOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);
  const [userData, setUserData] = useState(null);
  const [profileImage, setProfileImage] = useState(null);

  // ✅ Responsive detection
  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ✅ Fetch user info from Firestore
  useEffect(() => {
    const fetchUserData = async () => {
      const currentUser = auth.currentUser;
      if (!currentUser) return;
      try {
        const docRef = doc(db, storagePath, currentUser.uid);
        const snap = await getDoc(docRef);
        if (snap.exists()) setUserData(snap.data());
      } catch (err) {
        console.error("Gabim gjatë marrjes së të dhënave të përdoruesit:", err);
      }
    };
    fetchUserData();
  }, [storagePath]);

  // ✅ Load stored profile image
  useEffect(() => {
    const savedImage = localStorage.getItem(`profileImage_${profileKey}`);
    if (savedImage) setProfileImage(savedImage);
  }, [profileKey]);

  // ✅ Handle photo upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfileImage(reader.result);
      localStorage.setItem(`profileImage_${profileKey}`, reader.result);
    };
    reader.readAsDataURL(file);
  };

  const triggerFileInput = () => {
    document.getElementById(`sidebarFileInput_${profileKey}`).click();
  };

  const name = userData
    ? `${userData.name || ""} ${userData.surname || ""}`.trim()
    : "Ngarkim...";
  const role = userData?.role || roleLabel;
  const avatar = name ? name.charAt(0).toUpperCase() : "?";

  return (
    <>
      {/* 📱 Mobile Header */}
      {!isDesktop && (
        <div className="mobile-header">
          <div className="user-section">
            {profileImage ? (
              <img
                src={profileImage}
                alt="Profile"
                className="avatar-image"
                onClick={triggerFileInput}
              />
            ) : (
              <div className="avatar" onClick={triggerFileInput}>
                {avatar}
              </div>
            )}
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

      {/* 🖥️ Sidebar */}
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
                {profileImage ? (
                  <img
                    src={profileImage}
                    alt="Profile"
                    className="avatar-image"
                    onClick={triggerFileInput}
                  />
                ) : (
                  <div className="avatar" onClick={triggerFileInput}>
                    {avatar}
                  </div>
                )}

                <input
                  type="file"
                  id={`sidebarFileInput_${profileKey}`}
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={handleImageUpload}
                />

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
}