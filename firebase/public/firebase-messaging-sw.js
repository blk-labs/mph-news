// import { messagingService } from "./lib/services";
// const { messagingService } = require("./lib/services");
importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js"
);

firebase.initializeApp({
  apiKey: "AIzaSyD6MN9wM0dLWpo-2ynMrdTUZtfsiaeD5Fw",
  authDomain: "poli-news-77c19.firebaseapp.com",
  projectId: "poli-news-77c19",
  storageBucket: "poli-news-77c19.appspot.com",
  messagingSenderId: "274299796406",
  appId: "1:274299796406:web:024475ea1a70c1a8a0df17",
  measurementId: "G-LHVY9JGKT6",
});
// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();
messaging.onBackgroundMessage(function(payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  // Customize notification here
  const notificationTitle = 'Background Message Title';
  const notificationOptions = {
    body: 'Background Message body.',
    icon: '/firebase-logo.png'
  };

  self.registration.showNotification(notificationTitle,
    notificationOptions);
});

