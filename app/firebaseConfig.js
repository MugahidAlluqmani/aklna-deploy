// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, push, onValue, update, remove } from 'firebase/database';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDwRmXALG8cE3U2pGio670j27N0HFXAnWs",
  authDomain: "aklna-62ccc.firebaseapp.com",
  databaseURL: "https://aklna-62ccc-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "aklna-62ccc",
  storageBucket: "aklna-62ccc.appspot.com",
  messagingSenderId: "999018453356",
  appId: "1:999018453356:web:5f318ce94a5bf62610bb49",
  measurementId: "G-Q0E0GZ1H31"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Export database and authentication functions
export { database, ref, set, push, onValue, update, remove, auth, provider, signInWithPopup, signOut };