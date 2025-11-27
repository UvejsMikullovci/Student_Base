import React, { useEffect, useState } from "react";
import "./ProfessorPanelSettings.css";
import { auth, db } from "../../../../../Firebase/firebase";
import {
  signOut,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { CreditCard, Lock, User } from "lucide-react";

function ProfessorPanelSettings() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: "",
    surname: "",
    phone: "",
    city: "",
    nationality: "",
    email: "",
  });

  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [passwordMessage, setPasswordMessage] = useState("");
  const [cards, setCards] = useState([]); // 🔹 Saved cards

  // Fetch user data + cards
  useEffect(() => {
    const fetchData = async () => {
      const currentUser = auth.currentUser;
      if (!currentUser) return;

      try {
        const docRef = doc(db, "registrations", currentUser.uid);
        const snap = await getDoc(docRef);
        if (snap.exists()) {
          const data = snap.data();
          setUserData({
            ...data,
            email: currentUser.email,
          });
          setCards(data.creditcards || []);
        }
      } catch (error) {
        console.error("Gabim gjatë marrjes së të dhënave:", error);
      }
    };

    fetchData();
  }, []);

  // Handle inputs
  const handleChange = (e) =>
    setUserData({ ...userData, [e.target.name]: e.target.value });

  const handlePasswordChange = (e) =>
    setPasswords({ ...passwords, [e.target.name]: e.target.value });

  // Save personal info
  const handleSave = async () => {
    const currentUser = auth.currentUser;
    if (!currentUser) return;

    try {
      setSaving(true);
      const docRef = doc(db, "registrations", currentUser.uid);
      await updateDoc(docRef, {
        name: userData.name,
        surname: userData.surname,
        phone: userData.phone,
        city: userData.city,
        nationality: userData.nationality,
      });
      setMessage("Ndryshimet u ruajtën me sukses.");
    } catch (error) {
      console.error("Gabim gjatë ruajtjes së ndryshimeve:", error);
      setMessage("Gabim gjatë ruajtjes së ndryshimeve.");
    } finally {
      setSaving(false);
      setTimeout(() => setMessage(""), 3000);
    }
  };

  // Change password
  const handlePasswordSave = async () => {
    const { currentPassword, newPassword, confirmPassword } = passwords;
    const currentUser = auth.currentUser;
    if (!currentUser) return;
    if (newPassword !== confirmPassword) {
      setPasswordMessage("Fjalëkalimet nuk përputhen.");
      return;
    }

    try {
      const credential = EmailAuthProvider.credential(
        currentUser.email,
        currentPassword
      );
      await reauthenticateWithCredential(currentUser, credential);
      await updatePassword(currentUser, newPassword);
      setPasswordMessage("Fjalëkalimi u përditësua me sukses.");
      setPasswords({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } catch (error) {
      console.error("Gabim gjatë përditësimit të fjalëkalimit:", error);
      setPasswordMessage(
        "Gabim gjatë ndryshimit të fjalëkalimit. Kontrollo kredencialet."
      );
    } finally {
      setTimeout(() => setPasswordMessage(""), 3000);
    }
  };

  // Logout
  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Gabim gjatë daljes nga llogaria:", error);
    }
  };

  // Redirect to Payments if no cards
  const handleAddPayment = () => {
    navigate("/panel/pagesat");
  };

  return (
    <div className="settings-container">
      <h1 className="notif-heading-main">Cilësimet</h1>
      <p className="notif-paragraph-main">Menaxho të gjitha të dhënat e llogarisë</p>

      {/* Personal Information */}
      <div className="personal-information">
        <h1 className="card-head">
          <User
            size={24}
            strokeWidth={2}
            color="#DF4C4A"
            style={{ marginRight: "10px", marginTop: "10px" }}
          />
          Informacioni Personal
        </h1>
        <p className="card-paragraph" style={{ marginBottom: "20px" }}>
          Përditëso informacionin tënd personal
        </p>

        <div className="inputs-container">
          <div className="name-inputs">
            <div className="input-group">
              <label className="input-label">Emri</label>
              <input
                className="input-field"
                type="text"
                name="name"
                value={userData.name || ""}
                onChange={handleChange}
                placeholder="Emri"
              />
            </div>

            <div className="input-group">
              <label className="input-label">Mbiemri</label>
              <input
                className="input-field"
                type="text"
                name="surname"
                value={userData.surname || ""}
                onChange={handleChange}
                placeholder="Mbiemri"
              />
            </div>
          </div>

          <div className="input-group">
            <label className="input-label">Email</label>
            <input
              className="input-field"
              type="email"
              value={userData.email || ""}
              disabled
            />
          </div>

          <div className="input-group">
            <label className="input-label">Telefoni</label>
            <input
              className="input-field"
              type="tel"
              name="phone"
              value={userData.phone || ""}
              onChange={handleChange}
              placeholder="+383 44 123 456"
            />
          </div>

          <div className="name-inputs">
            <div className="input-group">
              <label className="input-label">Qyteti</label>
              <input
                className="input-field"
                type="text"
                name="city"
                value={userData.city || ""}
                onChange={handleChange}
                placeholder="Prishtinë"
              />
            </div>
            <div className="input-group">
              <label className="input-label">Shtetësia</label>
              <input
                className="input-field"
                type="text"
                name="nationality"
                value={userData.nationality || ""}
                onChange={handleChange}
                placeholder="Kosova"
              />
            </div>
          </div>

          <button className="save-button" onClick={handleSave} disabled={saving}>
            {saving ? "Duke ruajtur..." : "Ruaj Ndryshimet"}
          </button>
          {message && <p className="message">{message}</p>}
        </div>
      </div>

      {/* Password Section */}
      <div className="safety-information">
        <h1 className="card-head">
          <Lock
            size={24}
            strokeWidth={2}
            color="#DF4C4A"
            style={{ marginRight: "10px", marginTop: "10px" }}
          />
          Ndrysho Fjalëkalimin
        </h1>
        <p className="card-paragraph" style={{ marginBottom: "20px" }}>
          Përditëso fjalëkalimin tënd
        </p>

        <div className="inputs-container">
          <div className="input-group">
            <label className="input-label">Fjalëkalimi Aktual</label>
            <input
              className="input-field"
              type="password"
              name="currentPassword"
              value={passwords.currentPassword}
              onChange={handlePasswordChange}
            />
          </div>

          <div className="input-group">
            <label className="input-label">Fjalëkalimi i Ri</label>
            <input
              className="input-field"
              type="password"
              name="newPassword"
              value={passwords.newPassword}
              onChange={handlePasswordChange}
            />
          </div>

          <div className="input-group">
            <label className="input-label">Konfirmo Fjalëkalimin</label>
            <input
              className="input-field"
              type="password"
              name="confirmPassword"
              value={passwords.confirmPassword}
              onChange={handlePasswordChange}
            />
          </div>

          <button className="save-button" onClick={handlePasswordSave}>
            Ndrysho Fjalëkalimin
          </button>
          {passwordMessage && <p className="message">{passwordMessage}</p>}
        </div>
      </div>

      {/* Logout */}
      <div className="notification-container">
        <div
          className="notification-item"
          style={{ border: "none" }}
        >
        </div>

        <div className="notification-item" style={{ border: "none" }}>
          <div className="notification-text">
            <span>Dil nga Llogaria</span>
            <p>Dalje nga platforma dhe përfundim i sesionit</p>
          </div>
          <button
            onClick={handleLogout}
            style={{
              fontWeight: "500",
              cursor: "pointer",
              fontSize: "1rem",
            }}
          >
            Dil Nga Llogaria
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfessorPanelSettings;