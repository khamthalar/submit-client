importScripts('https://www.gstatic.com/firebasejs/7.6.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.6.0/firebase-messaging.js');

firebase.initializeApp({
    apiKey: "AIzaSyBbOvWG0rAq87UpzzrQwgJddVE-7kjCXVs",
    authDomain: "submitdevices.firebaseapp.com",
    databaseURL: "https://submitdevices.firebaseio.com",
    projectId: "submitdevices",
    storageBucket: "submitdevices.appspot.com",
    messagingSenderId: "926521726382",
    appId: "1:926521726382:web:15406c0459f3913944a43f",
    measurementId: "G-8ES4EYR1SH"

});
const messaging = firebase.messaging();

// self.addEventListener('notificationclick', function(event) {
//     event.notification.close();
//     event.waitUntil(self.clients.openWindow(event.notification.data.url));
// });