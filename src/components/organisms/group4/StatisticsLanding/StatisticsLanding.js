import React, { useState, useEffect } from "react";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from "../../../../Firebase/firebase";
import { Plus } from "lucide-react";
import "./StatisticsLanding.css";
import StatisticsBasicDiv from "../../../molecules/group4/statisticsDiv/StatisticsBasicDiv";

function AddStatModal({ visible, onClose, onSave, fieldLabel, currentValue }) {
  const [value, setValue] = useState(currentValue || "");

  const handleSubmit = () => {
    onSave(value);
    setValue("");
    onClose();
  };

  if (!visible) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Update {fieldLabel}</h3>
        <input
          placeholder={fieldLabel}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button onClick={handleSubmit}>Save</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
}

function StatisticsLanding() {
  const userId = "user_id1";
  const statsCollection = collection(db, "registrations", userId, "stats");

  const [stats, setStats] = useState({
    average: "0",
    rank: "0/0",
    objectives: "0/0",
    studyHours: "0h",
  });

  const [modalVisible, setModalVisible] = useState(false);
  const [modalField, setModalField] = useState("");
  const [modalCurrentValue, setModalCurrentValue] = useState("");

  useEffect(() => {
    const fetchStats = async () => {
      const snapshot = await getDocs(statsCollection);
      const data = snapshot.docs.map((doc) => doc.data());

      const averageObj = data.find((d) => d.type === "average");
      const rankObj = data.find((d) => d.type === "rank");
      const objectivesObj = data.find((d) => d.type === "objectives");
      const studyHoursObj = data.find((d) => d.type === "studyHours");

      setStats({
        average: averageObj ? averageObj.value : "0",
        rank: rankObj ? rankObj.value : "0/0",
        objectives: objectivesObj ? objectivesObj.value : "0/0",
        studyHours: studyHoursObj ? studyHoursObj.value : "0h",
      });
    };

    fetchStats();
  }, []);

  const openModal = (field, currentValue) => {
    setModalField(field);
    setModalCurrentValue(currentValue);
    setModalVisible(true);
  };

  const saveStat = async (value) => {
    await addDoc(statsCollection, { type: modalField, value });
    const snapshot = await getDocs(statsCollection);
    const data = snapshot.docs.map((doc) => doc.data());

    setStats({
      average: data.find((d) => d.type === "average")?.value || "0",
      rank: data.find((d) => d.type === "rank")?.value || "0/0",
      objectives: data.find((d) => d.type === "objectives")?.value || "0/0",
      studyHours: data.find((d) => d.type === "studyHours")?.value || "0h",
    });
  };

  return (
    <div>
      <div className="statistics-text">
        <h2>Statistikat</h2>
        <p>Shiko performancën dhe progresionin tënd</p>
      </div>

      <div className="statistics-container">
        <StatisticsBasicDiv
          value={stats.average}
          label={
            <>
              Mesatarja juaj{" "}
              <Plus
                size={16}
                className="cursor-pointer"
                onClick={() => openModal("average", stats.average)}
              />
            </>
          }
          change="+0.4"
          changeColor="text-green-600"
          iconName="TrendingUp"
        />
        <StatisticsBasicDiv
          value={stats.rank}
          label={
            <>
              Vendi në klasë{" "}
              <Plus
                size={16}
                className="cursor-pointer"
                onClick={() => openModal("rank", stats.rank)}
              />
            </>
          }
          change="+2"
          changeColor="text-green-600"
          iconName="Users"
        />
        <StatisticsBasicDiv
          value={stats.objectives}
          label={
            <>
              Objektivat e arritura{" "}
              <Plus
                size={16}
                className="cursor-pointer"
                onClick={() => openModal("objectives", stats.objectives)}
              />
            </>
          }
          change="+0.4"
          changeColor="text-green-600"
          iconName="Target"
        />
        <StatisticsBasicDiv
          value={stats.studyHours}
          label={
            <>
              Orë studimi{" "}
              <Plus
                size={16}
                className="cursor-pointer"
                onClick={() => openModal("studyHours", stats.studyHours)}
              />
            </>
          }
          change="+18h"
          changeColor="text-green-600"
          iconName="Clock"
        />
      </div>

      <AddStatModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSave={saveStat}
        fieldLabel={modalField}
        currentValue={modalCurrentValue}
      />
    </div>
  );
}

export default StatisticsLanding;
