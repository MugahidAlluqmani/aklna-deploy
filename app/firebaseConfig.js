// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, push, onValue, update, remove } from 'firebase/database';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

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
const messaging = getMessaging(app);


// طلب إذن الإشعارات
export const requestNotificationPermission = async () => {
  try {
    const token = await getToken(messaging, { vapidKey: "BF5aiNgR55vkSFThnnyn9GEoD97NmSgCxRkykaaeN1NATWjX1bgI96khLuXeVCf1lPdVjiMta9AZiCdOGMFmfPs" });
    if (token) {
      console.log('FCM Token:', token);
      return token;
    } else {
      console.warn('No registration token available.');
    }
  } catch (error) {
    console.error('Error getting FCM token:', error);
  }
};

// استقبال الإشعارات في الواجهة الأمامية
export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });

// Export database and authentication functions
export { database, ref, set, push, onValue, update, remove, auth, provider, signInWithPopup, signOut };