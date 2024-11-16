

importScripts('https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/9.21.0/firebase-messaging.js');

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

  firebase.initializeApp(firebaseConfig);

// إعداد Firebase Messaging
const messaging = firebase.messaging();

// معالجة استقبال الإشعارات في الخلفية
messaging.onBackgroundMessage((payload) => {
  console.log('Received background message ', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/firebase-logo.png',
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});