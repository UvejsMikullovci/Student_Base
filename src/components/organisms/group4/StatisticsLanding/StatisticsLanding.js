import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "../../../../Firebase/firebase";
import { Loader2, BarChart3 } from "lucide-react";
import "./StatisticsLanding.css";
import StatisticsBasicDiv from "../../../molecules/group4/statisticsDiv/StatisticsBasicDiv";

function StatisticsLanding() {
  const auth = getAuth();
  const userId = auth.currentUser?.uid;

  const statsCollection = userId
    ? collection(db, "registrations", userId, "stats")
    : null;

  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;

    const fetchStats = async () => {
      try {
        const snapshot = await getDocs(statsCollection);
        if (snapshot.empty) {
          setStats(null);
          setLoading(false);
          return;
        }

        const data = snapshot.docs.map((doc) => doc.data());
        setStats({
          average: data.find((d) => d.type === "average") || {},
          rank: data.find((d) => d.type === "rank") || {},
          objectives: data.find((d) => d.type === "objectives") || {},
          studyHours: data.find((d) => d.type === "studyHours") || {},
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [userId]);

  if (!userId) {
    return (
      <div className="flex flex-col items-center justify-center p-6 text-center">
        <BarChart3 className="text-gray-500 mb-3" size={40} />
        <h2 className="text-xl font-semibold">Kyçuni për të parë statistikat</h2>
        <p className="text-gray-500 mt-1">
          Ju lutem identifikohuni për të parë progresin tuaj.
        </p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center p-6">
        <Loader2 className="animate-spin text-blue-500" size={40} />
        <p className="text-gray-500 mt-2">Duke ngarkuar statistikat...</p>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="flex flex-col items-center justify-center p-8 bg-white rounded-2xl shadow-sm border border-gray-100 max-w-md mx-auto text-center">
        <div className="divwithicon">        
          <BarChart3 className="text-red-400 mb-3 redcolor" size={48} />
        <p className="text-gray-500 mt-1 text-sm">
          Statistikat tuaja do të shfaqen këtu sapo të shtohen.
        </p></div>
      </div>
    );
  }

  const getColor = (color) => {
    switch (color) {
      case "green":
        return "text-green-600";
      case "red":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <div className="p-6">
      <div className="statistics-text text-center mb-6">
        <h2 className="text-2xl font-semibold">Statistikat</h2>
        <p className="text-gray-500">
          Shiko performancën dhe progresionin tënd
        </p>
      </div>

      <div className="statistics-container grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatisticsBasicDiv
          value={stats.average.value || "0"}
          label="Mesatarja juaj"
          change={stats.average.change || "0"}
          changeColor={getColor(stats.average.changeColor)}
          iconName="TrendingUp"
        />
        <StatisticsBasicDiv
          value={stats.rank.value || "0/0"}
          label="Vendi në klasë"
          change={stats.rank.change || "0"}
          changeColor={getColor(stats.rank.changeColor)}
          iconName="Users"
        />
        <StatisticsBasicDiv
          value={stats.objectives.value || "0/0"}
          label="Objektivat e arritura"
          change={stats.objectives.change || "0"}
          changeColor={getColor(stats.objectives.changeColor)}
          iconName="Target"
        />
        <StatisticsBasicDiv
          value={stats.studyHours.value || "0h"}
          label="Orë studimi"
          change={stats.studyHours.change || "0h"}
          changeColor={getColor(stats.studyHours.changeColor)}
          iconName="Clock"
        />
      </div>
    </div>
  );
}

export default StatisticsLanding;
