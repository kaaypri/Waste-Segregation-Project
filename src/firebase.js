import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDisQj-dM_BbBXyVbRMLuwckAt_AAb83Tg",
  authDomain: "waste-seg-db-27a44.firebaseapp.com",
  projectId: "waste-seg-db-27a44",
  storageBucket: "waste-seg-db-27a44.firebasestorage.app",
  messagingSenderId: "708604728762",
  appId: "1:708604728762:web:ac68f82d09e075923ff983",
  measurementId: "G-PN8G5JJ40X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;

export { db, auth, analytics };
