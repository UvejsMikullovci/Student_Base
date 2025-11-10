import React, { useState,useEffect } from "react";
import { auth } from "../../../../Firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import "./PanelProfileSettings.css";

function PanelProfileSettings() {
   const [currentUser, setCurrentUser] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const [notifications, setNotifications] = useState({
    email: true,
    grade: true,
    announcement: false,
    weekly: true,
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);

  
        const nameParts = user.displayName ? user.displayName.split(" ") : ["", ""];
        setFormData({
          firstName: nameParts[0] || "",
          lastName: nameParts[1] || "",
          email: user.email || "",
          phone: user.phoneNumber || "",
        });
      } else {
        setCurrentUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const toggleNotification = (type) => {
    setNotifications((prev) => ({ ...prev, [type]: !prev[type] }));
  };

  return (
    <div className="settings-container">

      <div className="settings-section">
        <h3><i className="fa-regular fa-user"></i> Personal Information</h3>
        <p>Update your personal details and contact information</p>

        <div className="form-row">
          <div className="form-group">
            <label>First Name</label>
            <input
              type="text"
              name="firstName"
              placeholder={formData.firstName || "First name"}
              value={formData.firstName}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Last Name</label>
            <input
              type="text"
              name="lastName"
              placeholder={formData.lastName || "Last name"}
              value={formData.lastName}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder={formData.email || "Email"}
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Phone</label>
            <input
              type="text"
              name="phone"
              placeholder={formData.phone || "Phone number"}
              value={formData.phone}
              onChange={handleChange}
            />
          </div>
        </div>
        <button className="save-btn">Save Changes</button>
      </div>


      <div className="settings-section">
        <h3><i className="fa-regular fa-bell"></i> Notification Preferences</h3>
        <p>Manage how you receive notifications</p>

        <div className="toggle-item">
          <div>
            <strong>Email Notifications</strong>
            <p>Receive email notifications for important updates</p>
          </div>
          <label className="switch">
            <input
              type="checkbox"
              checked={notifications.email}
              onChange={() => toggleNotification("email")}
            />
            <span className="slider"></span>
          </label>
        </div>

        <div className="toggle-item">
          <div>
            <strong>Grade Updates</strong>
            <p>Get notified when students submit assignments</p>
          </div>
          <label className="switch">
            <input
              type="checkbox"
              checked={notifications.grade}
              onChange={() => toggleNotification("grade")}
            />
            <span className="slider"></span>
          </label>
        </div>

        <div className="toggle-item">
          <div>
            <strong>Announcement Reminders</strong>
            <p>Reminders before scheduled exams and deadlines</p>
          </div>
          <label className="switch">
            <input
              type="checkbox"
              checked={notifications.announcement}
              onChange={() => toggleNotification("announcement")}
            />
            <span className="slider"></span>
          </label>
        </div>

        <div className="toggle-item">
          <div>
            <strong>Weekly Digest</strong>
            <p>Receive a weekly summary of your courses</p>
          </div>
          <label className="switch">
            <input
              type="checkbox"
              checked={notifications.weekly}
              onChange={() => toggleNotification("weekly")}
            />
            <span className="slider"></span>
          </label>
        </div>
      </div>

      <div className="settings-section">
        <h3><i className="fa-solid fa-lock"></i> Security</h3>
        <p>Manage your password and security settings</p>

        <div className="form-group">
          <label>Current Password</label>
          <input type="password" placeholder="Enter current password" />
        </div>
        <div className="form-group">
          <label>New Password</label>
          <input type="password" placeholder="Enter new password" />
        </div>
        <div className="form-group">
          <label>Confirm New Password</label>
          <input type="password" placeholder="Confirm new password" />
        </div>
        <button className="update-btn">Update Password</button>
      </div>
    </div>
  );
}

export default PanelProfileSettings