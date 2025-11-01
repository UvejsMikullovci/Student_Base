import React, { useState, useEffect } from "react";
import "./PersonalInformation.css";
import { auth, db } from "../../../../Firebase/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";

function PersonalInformation() {
  const [info, setInfo] = useState(null);
  const [tempInfo, setTempInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (!user) {
        setLoading(false);
        return;
      }
      try {
        const docRef = doc(db, "registrations", user.uid);
        const snap = await getDoc(docRef);
        if (snap.exists()) {
          const data = snap.data();
          setInfo(data);
          setTempInfo(data);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
      setLoading(false);
    };
    fetchUserData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTempInfo({ ...tempInfo, [name]: value });
  };

  const handleSave = async () => {
    if (!tempInfo) return;
    const user = auth.currentUser;
    if (!user) return;
    try {
      setSaving(true);
      const docRef = doc(db, "registrations", user.uid);
      const safeData = Object.fromEntries(
        Object.entries(tempInfo).map(([key, value]) => [key, value ?? ""])
      );
      await updateDoc(docRef, safeData);
      setInfo({ ...tempInfo });
      setMessage("Changes saved successfully.");
    } catch (error) {
      setMessage(`Error saving changes: ${error.message}`);
    } finally {
      setSaving(false);
      setTimeout(() => setMessage(""), 3000);
    }
  };

  const handleCancel = () => {
    setTempInfo({ ...info });
  };

  if (loading) return <p>Loading user data...</p>;
  if (!info) return <p>No user data available.</p>;

  return (
    <div className="personal-info-container">
      <h2>Personal Information</h2>
      <div className="input-fields">
        <input type="text" name="name" value={tempInfo.name || ""} onChange={handleChange} placeholder="Name" />
        <input type="text" name="surname" value={tempInfo.surname || ""} onChange={handleChange} placeholder="Surname" />
        <input type="tel" name="phone" value={tempInfo.phone || ""} onChange={handleChange} placeholder="Phone number" />
        <input type="date" name="dob" value={tempInfo.dob || ""} onChange={handleChange} />
        <select name="gender" value={tempInfo.gender || ""} onChange={handleChange}>
          <option value="">Select gender...</option>
          <option value="Mashkull">Mashkull</option>
          <option value="Femër">Femër</option>
          <option value="Tjetër">Tjetër</option>
        </select>
        <input type="text" name="city" value={tempInfo.city || ""} onChange={handleChange} placeholder="City" />
        <input type="text" name="address" value={tempInfo.address || ""} onChange={handleChange} placeholder="Address" />
        <input type="text" name="citizenship" value={tempInfo.citizenship || ""} onChange={handleChange} placeholder="Citizenship" />
        <input type="text" name="nationality" value={tempInfo.nationality || ""} onChange={handleChange} placeholder="Nationality" />
      </div>
      <div className="buttons">
        <button onClick={handleSave} disabled={saving}>{saving ? "Saving..." : "Save"}</button>
        <button onClick={handleCancel}>Cancel</button>
      </div>
      {message && <p className="message">{message}</p>}
    </div>
  );
}

export default PersonalInformation;