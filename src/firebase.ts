import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBw91_gHz0y7mn9hnHvuoVUgCCOlsFfIVw",
  authDomain: "mbnc-7276f.firebaseapp.com",
  projectId: "mbnc-7276f",
  storageBucket: "mbnc-7276f.firebasestorage.app",
  messagingSenderId: "439840175538",
  appId: "1:439840175538:web:9f54331480960243dae0ab",
  measurementId: "G-F6RXT9WVHW",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
