
  // [START messaging_init_in_sw]
  // Give the service worker access to Firebase Messaging.
  // Note that you can only use Firebase Messaging here. Other Firebase libraries
  // are not available in the service worker.
  // Replace 10.13.2 with latest version of the Firebase JS SDK.
  importScripts('https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js');
  importScripts('https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js');  

  // Initialize the Firebase app in the service worker by passing in
  // your app's Firebase config object.
  // https://firebase.google.com/docs/web/setup#config-object
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

  // تهيئة Firebase Messaging
  const messaging = firebase.messaging();
  
  messaging.onBackgroundMessage((payload) => {
    console.log("Received background message: ", payload);
  
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
      body: payload.notification.body,
      icon: payload.notification.icon
    };
  
    self.registration.showNotification(notificationTitle, notificationOptions);
  });
