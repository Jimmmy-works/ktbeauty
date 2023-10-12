import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAEIMjevWJJQM3E81h14QZx0YIssKwBXMo",
  authDomain: "ktbeauty-53a2b.firebaseapp.com",
  projectId: "ktbeauty-53a2b",
  storageBucket: "ktbeauty-53a2b.appspot.com",
  messagingSenderId: "304105739187",
  appId: "1:304105739187:web:d9d60ed12286bf07a8f1c6",
  measurementId: "G-B6RN0ETW4F",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firebaseStore = getFirestore(app);
export const firebaseStorage = getStorage(app);
