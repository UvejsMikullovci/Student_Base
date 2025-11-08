import React, { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../Firebase/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        try {
          // 🔥 Fetch user's Firestore document
          const userDocRef = doc(db, "registrations", currentUser.uid);
          const userDocSnap = await getDoc(userDocRef);

          if (userDocSnap.exists()) {
            const userData = userDocSnap.data();
            setUser({
              uid: currentUser.uid,
              email: currentUser.email,
              role: userData.role || "Student",
              ...userData,
            });
          } else {
            // fallback if no Firestore document found
            setUser({
              uid: currentUser.uid,
              email: currentUser.email,
              role: "Student",
            });
          }
        } catch (err) {
          console.error("Error loading user data:", err);
          setUser({
            uid: currentUser.uid,
            email: currentUser.email,
            role: "Student",
          });
        }
      } else {
        setUser(null);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (err) {
      console.error("Error signing out:", err);
    }
  };

  const value = {
    user,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthContext;