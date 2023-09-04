// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC4YTw5ANTkneuUIo_NYUGLPKug_3yVCro",
  authDomain: "blogproject-3e7e6.firebaseapp.com",
  projectId: "blogproject-3e7e6",
  storageBucket: "blogproject-3e7e6.appspot.com",
  messagingSenderId: "929406530814",
  appId: "1:929406530814:web:3d333d5687eaa06e88a1af",
  measurementId: "G-0MWP0FK1V5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const storage = getStorage(app);
export const database = getFirestore(app);
export const auth = getAuth(app);
