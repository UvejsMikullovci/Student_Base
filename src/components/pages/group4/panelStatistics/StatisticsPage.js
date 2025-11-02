import React, { useState, useEffect } from "react";
import { collection, addDoc, onSnapshot } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "../../../../Firebase/firebase";
import { Plus } from "lucide-react";

import StatisticsLanding from "../../../organisms/group4/StatisticsLanding/StatisticsLanding";
import StatisticsLineChart from "../../../molecules/group4/statisticsDiv/StatisticsLineChart";
import StatisticsBarChart from "../../../molecules/group4/statisticsDiv/StatisticsBarChart";
import StatisticsPieChart from "../../../molecules/group4/statisticsDiv/StatisticsPieChart";
import StatisticsBarHorizontal from "../../../molecules/group4/statisticsDiv/StatisticsBarHorizontal";

import "./StatisticsPage.css";

function AddDataModal({ visible, onClose, onSave, fields }) {
  const [form, setForm] = useState({});

  const handleChange = (key, value) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = () => {
    onSave(form);
    setForm({});
    onClose();
  };

  if (!visible) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Add Details</h3>
        {fields.map((field) => (
          <input
            key={field}
            placeholder={field}
            value={form[field] || ""}
            onChange={(e) => handleChange(field, e.target.value)}
          />
        ))}
        <button onClick={handleSubmit}>Add</button>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

function StatisticsPage() {
  const auth = getAuth();
  const userId = auth.currentUser?.uid;

  const statsCollection = userId
    ? collection(db, "registrations", userId, "stats")
    : null;

  const [progressData, setProgressData] = useState([]);
  const [subjectData, setSubjectData] = useState([]);
  const [barData, setBarData] = useState([]);
  const [pieData, setPieData] = useState([]);

  const [modalVisible, setModalVisible] = useState(false);
  const [modalFields, setModalFields] = useState([]);
  const [modalSaveCallback, setModalSaveCallback] = useState(() => {});

  // Real-time Firestore listener
  useEffect(() => {
    if (!userId) return;

    const unsubscribe = onSnapshot(statsCollection, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

      setProgressData(data.filter((d) => d.type === "progress"));
      setSubjectData(data.filter((d) => d.type === "subject"));
      setBarData(data.filter((d) => d.type === "bar"));
      setPieData(data.filter((d) => d.type === "pie"));
    });

    return () => unsubscribe();
  }, [userId]);

  const openModal = (fields, saveCallback) => {
    setModalFields(fields);
    setModalSaveCallback(() => saveCallback);
    setModalVisible(true);
  };

  const saveDataToFirestore = async (data) => {
    if (!userId) return;

    try {
      await addDoc(statsCollection, data);
    } catch (error) {
      console.error("Failed to save data:", error);
    }
  };

  if (!userId) return <p>Please log in to view statistics.</p>;

  return (
    <div>
      <div className="statistics-line-chart-section">
        <StatisticsLanding />
      </div>

      <div className="statistics-charts-section">
        <div className="statistics-line-chart">
          <h2>
            Progresi i notave{" "}
            <Plus
              size={20}
              className="cursor-pointer"
              onClick={() =>
                openModal(["name", "Nota mesatare"], (data) =>
                  saveDataToFirestore({ ...data, type: "progress" })
                )
              }
            />
          </h2>
          <StatisticsLineChart
            title="Progresi i notave"
            data={progressData}
            dataKey="name"
            lineKey="Nota mesatare"
          />
        </div>

        <div className="statistics-bar-chart">
          <h2>
            Progresi i notave{" "}
            <Plus
              size={20}
              className="cursor-pointer"
              onClick={() =>
                openModal(["name", "Nota mesatare"], (data) =>
                  saveDataToFirestore({ ...data, type: "progress" })
                )
              }
            />
          </h2>
          <StatisticsBarChart
            title="Progresi i notave"
            data={progressData}
            dataKey="name"
            barKey="Nota mesatare"
          />
        </div>
      </div>

      <div className="statistics-charts-section">
        <div className="statistics-line-chart">
          <h2>
            Krahasim me klasën{" "}
            <Plus
              size={20}
              className="cursor-pointer"
              onClick={() =>
                openModal(["name", "Nota mesatare"], (data) =>
                  saveDataToFirestore({ ...data, type: "bar" })
                )
              }
            />
          </h2>
          <StatisticsBarHorizontal
            title="Krahasim me klasën"
            data={barData}
            dataKey="name"
            barKey="Nota mesatare"
          />
        </div>

        <div className="statistics-bar-chart">
          <h2>
            Shpërndarja e aktiviteteve{" "}
            <Plus
              size={20}
              className="cursor-pointer"
              onClick={() =>
                openModal(["name", "value"], (data) =>
                  saveDataToFirestore({ ...data, type: "pie" })
                )
              }
            />
          </h2>
          <StatisticsPieChart
            title="Shpërndarja e aktiviteteve"
            data={pieData}
            dataKey="value"
            nameKey="name"
          />
        </div>
      </div>

      <AddDataModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSave={modalSaveCallback}
        fields={modalFields}
      />
    </div>
  );
}

export default StatisticsPage;
