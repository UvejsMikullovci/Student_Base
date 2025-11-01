import React, { useState, useEffect, useMemo } from "react";
import { auth, db } from "../../../../Firebase/firebase";
import {
  collection,
  addDoc,
  onSnapshot,
  deleteDoc,
  doc,
} from "firebase/firestore";
import StatsRow from "../../../molecules/group4/panelAplications/StatsRow";
import FilterTabs from "../../../organisms/group4/panelAplications/FilterTabs";
import ApplicationsList from "../../../molecules/group4/panelAplications/ApplicationsList";
import "./panelAplications.css";

export default function PanelAplications() {
  const [applications, setApplications] = useState([]);
  const [activeFilter, setActiveFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newApp, setNewApp] = useState({
    university: "",
    program: "",
    date: "",
    status: "Në pritje",
  });

  // 🔹 Real-time load from user's subcollection
  useEffect(() => {
    const user = auth.currentUser;
    if (!user) {
      setLoading(false);
      return;
    }

    const appsRef = collection(db, "registrations", user.uid, "applications");
    const unsubscribe = onSnapshot(
      appsRef,
      (snapshot) => {
        const list = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setApplications(list);
        setLoading(false);
      },
      (error) => {
        console.error("Gabim gjatë marrjes së aplikimeve:", error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  // 🔹 Add application to subcollection
  const handleAddApplication = async () => {
    const user = auth.currentUser;
    if (!user) return;
    if (!newApp.university || !newApp.program || !newApp.date) {
      alert("Plotëso të gjitha fushat!");
      return;
    }

    const appsRef = collection(db, "registrations", user.uid, "applications");
    await addDoc(appsRef, newApp);
    setNewApp({ university: "", program: "", date: "", status: "Në pritje" });
    setShowAddForm(false);
  };

  // 🔹 Delete an application
  const handleDelete = async (id) => {
    const user = auth.currentUser;
    if (!user) return;
    const docRef = doc(db, "registrations", user.uid, "applications", id);
    await deleteDoc(docRef);
  };

  // 🔹 Stats
  const stats = useMemo(() => {
    const total = applications.length;
    const accepted = applications.filter((a) => a.status === "Pranuar").length;
    const pending = applications.filter((a) => a.status === "Në pritje").length;
    const rejected = applications.filter((a) => a.status === "Refuzuar").length;
    return { total, accepted, pending, rejected };
  }, [applications]);

  // 🔹 Filter
  const filteredApps =
    activeFilter === "all"
      ? applications
      : applications.filter(
          (app) =>
            app.status.toLowerCase().replace(/\s/g, "") ===
            activeFilter.toLowerCase().replace(/\s/g, "")
        );

  return (
    <div className="panel-applications">
      <h1 className="applications-title">Aplikimet e mia</h1>
      <p className="applications-subtitle">
        Ndjek statusin e të gjitha aplikimeve tuaja
      </p>

      <StatsRow
        total={stats.total}
        accepted={stats.accepted}
        pending={stats.pending}
        rejected={stats.rejected}
      />

      <FilterTabs
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
        applications={applications}
      />

      <div className="applications-actions">
        <button
          className="add-app-btn"
          onClick={() => setShowAddForm(!showAddForm)}
        >
          <i className="fa-solid fa-plus"></i> Shto Aplikim
        </button>
      </div>

      {showAddForm && (
        <div className="add-app-form">
          <input
            type="text"
            placeholder="Universiteti"
            value={newApp.university}
            onChange={(e) =>
              setNewApp({ ...newApp, university: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Programi (p.sh. Inxhinieri Informatike)"
            value={newApp.program}
            onChange={(e) => setNewApp({ ...newApp, program: e.target.value })}
          />
          <input
            type="text"
            placeholder="Data e aplikimit"
            value={newApp.date}
            onChange={(e) => setNewApp({ ...newApp, date: e.target.value })}
          />
          <select
            value={newApp.status}
            onChange={(e) => setNewApp({ ...newApp, status: e.target.value })}
          >
            <option value="Në pritje">Në pritje</option>
            <option value="Pranuar">Pranuar</option>
            <option value="Refuzuar">Refuzuar</option>
          </select>
          <div className="add-buttons">
            <button onClick={handleAddApplication}>Ruaj</button>
            <button onClick={() => setShowAddForm(false)}>Anulo</button>
          </div>
        </div>
      )}

      {loading ? (
        <p>Duke ngarkuar aplikimet...</p>
      ) : filteredApps.length === 0 ? (
        <p className="no-apps">Nuk ka aplikime të regjistruara.</p>
      ) : (
        <ApplicationsList
          applications={filteredApps.map((app) => ({
            ...app,
            onDelete: () => handleDelete(app.id),
          }))}
        />
      )}
    </div>
  );
}