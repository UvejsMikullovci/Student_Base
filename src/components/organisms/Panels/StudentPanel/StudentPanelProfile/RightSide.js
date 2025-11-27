import React, { useEffect, useState } from "react";
import Profile from "../../../../molecules/Panels/StudentPanel/CollagePanelProfile/ProfileBox";
import FastStatistics from "../../../../molecules/Panels/StudentPanel/CollagePanelProfile/FastStatistics";
import "./RightSide.css";
import { auth, db } from "../../../../../Firebase/firebase";
import { doc, setDoc, onSnapshot } from "firebase/firestore";

export default function RightSide() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentUser = auth.currentUser;
    if (!currentUser) {
      setLoading(false);
      return;
    }

    const userDocRef = doc(db, "registrations", currentUser.uid);

    const unsubscribe = onSnapshot(userDocRef, async (snap) => {
      if (snap.exists()) {
        setUserData({ ...snap.data(), email: currentUser.email });
        setLoading(false);
      } else {
        const defaultData = {
          name: currentUser.displayName || "Përdorues",
          surname: "",
          email: currentUser.email,
          role: "Student",
          phone: "",
          city: "",
          nationality: "",
          totalApplications: 0,
          accepted: 0,
          pending: 0,
          documents: 0,
          createdAt: new Date().toISOString(),
        };
        await setDoc(userDocRef, defaultData);
        setUserData(defaultData);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="RightSide">
        <p>Duke ngarkuar të dhënat...</p>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="RightSide">
        <p>
       Nuk u gjetën të dhënat e përdoruesit.
        </p>
      </div>
    );
  }

  const initials = `${userData.name?.[0] || ""}${userData.surname?.[0] || ""}`.toUpperCase();

  return (
    <div className="RightSide">
      <div className="div-profileBoxi">
        <Profile
          profile={initials}
          src={userData.photoURL || ""}
          name={`${userData.name} ${userData.surname}`}
          email={userData.email}
          role={userData.role || "Student"}
          button="Ndrysho Foton"
        />
      </div>

      <div className="div-profileFastStatistics">
        <FastStatistics
          title="Statistika të Shpejta"
          headingOne="Aplikime Totale"
          valueOne={userData.totalApplications || 0}
          headingTwo="Të Pranuara"
          valueTwo={userData.accepted || 0}
          headingThree="Në Pritje"
          valueThree={userData.pending || 0}
          headingFour="Dokumente"
          valueFour={userData.documents || 0}
        />
      </div>
    </div>
  );
}