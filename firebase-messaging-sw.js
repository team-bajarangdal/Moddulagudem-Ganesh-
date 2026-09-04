importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyDYWkEr1FKAUNcmk2xFnbgC56v5B85pbWA",
  authDomain: "moddulagudem-ganesh.firebaseapp.com",
  databaseURL: "https://moddulagudem-ganesh-default-rtdb.firebaseio.com",
  projectId: "moddulagudem-ganesh",
  storageBucket: "moddulagudem-ganesh.firebasestorage.app",
  messagingSenderId: "1049615958722",
  appId: "1:1049615958722:web:833a5c94ebf10f0bc9b15b"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const title = payload.notification?.title || "శ్రీ గణేష్ ఉత్సవం 2026";
  const options = {
    body: payload.notification?.body || "New update from Moddulagudem Pandal!",
    icon: "./icon-192.png",
    badge: "./icon-192.png",
    data: {
      url: payload.data?.url || "./index.html"
    }
  };

  self.registration.showNotification(title, options);
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const targetUrl = event.notification.data?.url || './index.html';
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((windowClients) => {
      for (let client of windowClients) {
        if (client.url.includes(targetUrl) && 'focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow(targetUrl);
      }
    })
  );
});
