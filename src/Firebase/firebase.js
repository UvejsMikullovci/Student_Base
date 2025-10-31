import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
const firebaseConfig = {
  apiKey: "AIzaSyA71wiMaudQSmc7neipQ2tUSUwYMJmCpHY",
  authDomain: "maindatabasepractise.firebaseapp.com",
  databaseURL: "https://maindatabasepractise-default-rtdb.firebaseio.com",
  projectId: "maindatabasepractise",
  storageBucket: "maindatabasepractise.firebasestorage.app",
  messagingSenderId: "727187357647",
  appId: "1:727187357647:web:f8641722054004f8fedcba"
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
