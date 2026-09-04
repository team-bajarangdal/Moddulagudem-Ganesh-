const CACHE_NAME = 'ganesh-utsav-cache-v1';
const STATIC_ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png'
];

// 1. Installs and caches offline assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(STATIC_ASSETS))
  );
  self.skipWaiting();
});

// 2. Cleans up older caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// 3. Serves cached files when offline
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET' || event.request.url.includes('firebaseio.com')) {
    return;
  }
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});

// 4. WHEN DEVOTEE CLICKS THE NOTIFICATION BANNER:
self.addEventListener('notificationclick', (event) => {
  event.notification.close(); // Removes the notification from the status bar
  const targetUrl = event.notification.data?.url || './index.html';

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      // If the website or app is already sitting in recent apps, bring it forward
      for (let client of clientList) {
        if (client.url.includes('Moddulagudem-Ganesh-') && 'focus' in client) {
          return client.focus();
        }
      }
      // Otherwise open the page fresh
      if (clients.openWindow) {
        return clients.openWindow(targetUrl);
      }
    })
  );
});
