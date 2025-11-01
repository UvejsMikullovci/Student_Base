import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA71wiMaudQSmc7neipQ2tUSUwYMJmCpHY",
  authDomain: "maindatabasepractise.firebaseapp.com",
  databaseURL: "https://maindatabasepractise-default-rtdb.firebaseio.com",
  projectId: "maindatabasepractise",
  storageBucket: "maindatabasepractise.appspot.com", // ✅ FIXED
  messagingSenderId: "727187357647",
  appId: "1:727187357647:web:f8641722054004f8fedcba",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
export default app;