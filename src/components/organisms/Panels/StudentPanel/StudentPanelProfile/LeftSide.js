import React, { useState, useEffect } from "react";
import "./LeftSide.css";
import PersonalInformation from "../../../../molecules/Panels/StudentPanel/CollagePanelProfile/personalInformation";
import ProfileDocuments from "../../../../molecules/Panels/StudentPanel/CollagePanelProfile/Documents";
import { auth, db } from "../../../../../Firebase/firebase";
import { doc, getDoc, updateDoc, collection, onSnapshot } from "firebase/firestore";

export default function LeftSide() {
  const [tests, setTests] = useState([]);
  const [applications, setApplications] = useState([]);
  const [showTestForm, setShowTestForm] = useState(false);
  const [newTest, setNewTest] = useState({ name: "", score: "", date: "" });

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    const userRef = doc(db, "registrations", user.uid);
    const appsRef = collection(db, "registrations", user.uid, "applications");

    onSnapshot(userRef, (snap) => {
      if (snap.exists()) setTests(snap.data().tests || []);
    });

    onSnapshot(appsRef, (snap) => {
      const apps = snap.docs.map((d) => d.data());
      setApplications(apps);
    });
  }, []);

  const saveTests = async (newTests) => {
    const user = auth.currentUser;
    if (!user) return;
    const ref = doc(db, "registrations", user.uid);
    await updateDoc(ref, { tests: newTests });
  };

  const addTest = async () => {
    if (!newTest.name || !newTest.score || !newTest.date) return;
    const updated = [...tests, newTest];
    setTests(updated);
    await saveTests(updated);
    setNewTest({ name: "", score: "", date: "" });
    setShowTestForm(false);
  };

  const deleteTest = async (i) => {
    const updated = tests.filter((_, idx) => idx !== i);
    setTests(updated);
    await saveTests(updated);
  };

  return (
    <div className="left-side-wrapper">
      {/* Rezultatet e Testeve */}
      <div className="panel-section">
        <div className="section-header">
          <h2>Rezultatet e Testeve</h2>
          <i
            className="fa-solid fa-plus add-icon"
            onClick={() => setShowTestForm(!showTestForm)}
          ></i>
        </div>
        <p className="section-subtitle">
          Shto ose menaxho rezultatet e testimeve të tua.
        </p>

        {showTestForm && (
          <div className="test-form">
            <input
              type="text"
              placeholder="Emri i testit"
              value={newTest.name}
              onChange={(e) => setNewTest({ ...newTest, name: e.target.value })}
            />
            <input
              type="number"
              placeholder="Rezultati"
              value={newTest.score}
              onChange={(e) => setNewTest({ ...newTest, score: e.target.value })}
            />
            <input
              type="date"
              value={newTest.date}
              onChange={(e) => setNewTest({ ...newTest, date: e.target.value })}
            />
            <button onClick={addTest}>Ruaj</button>
          </div>
        )}

        <div className="tests-list">
          {tests.length ? (
            tests.map((t, i) => (
              <div className="test-card" key={i}>
                <div className="test-info">
                  <div>
                    <h4>{t.name}</h4>
                    <p className="date">{t.date}</p>
                  </div>
                  <div className="score">
                    {t.score}
                    <span> /100</span>
                  </div>
                </div>
                <div className="progress">
                  <div style={{ width: `${t.score}%` }}></div>
                </div>
                <i
                  className="fa-solid fa-trash delete"
                  onClick={() => deleteTest(i)}
                ></i>
              </div>
            ))
          ) : (
            <p className="no-data">Nuk ke shtuar ende rezultate testesh.</p>
          )}
        </div>
      </div>

      {/* Aplikimet e Mia */}
      <div className="panel-section">
        <h2>Aplikimet e Mia</h2>
        <p className="section-subtitle">
          Shiko statusin e aplikimeve që ke dorëzuar.
        </p>

        {applications.length ? (
          <div className="applications-list">
            {applications.map((a, i) => (
              <div className="app-card" key={i}>
                <div>
                  <h4>{a.university}</h4>
                  <p>{a.program}</p>
                  <p className="date">{a.date}</p>
                </div>
                <span
                  className={`status ${
                    a.status === "Pranuar"
                      ? "accepted"
                      : a.status === "Refuzuar"
                      ? "rejected"
                      : "pending"
                  }`}
                >
                  {a.status}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="no-data">Nuk ke ende aplikime të regjistruara.</p>
        )}
      </div>

      {/* Personal Info */}
      <PersonalInformation />
      <ProfileDocuments />
    </div>
  );
}