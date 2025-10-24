import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut,
  updateProfile,
  sendPasswordResetEmail,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAzUAbW0luDfSRseVt4-qnWpwmwxRU2u00",
  authDomain: "skill-share-app-2025.firebaseapp.com",
  projectId: "skill-share-app-2025",
  storageBucket: "skill-share-app-2025.firebasestorage.app",
  messagingSenderId: "838028493378",
  appId: "1:838028493378:web:6fe796a625ca91b960a3db",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut,
  updateProfile,
  sendPasswordResetEmail,
};

export const googleProvider = new GoogleAuthProvider();
