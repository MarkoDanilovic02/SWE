// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { getFirestore } from "@firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDvoleyhF7xLt_FAO5hgvjrmGTkmjVebcs",
  authDomain: "razglabati.firebaseapp.com",
  projectId: "razglabati",
  storageBucket: "razglabati.appspot.com",
  messagingSenderId: "397923218880",
  appId: "1:397923218880:web:5136a357ea43665b660425",
  measurementId: "G-QTZN0VE3RP",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export { signInWithPopup, onAuthStateChanged, signOut };
