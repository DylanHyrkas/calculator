const CACHE_NAME = 'calculator-pwa-cache-v1';
const CACHE_URLS = [
  '/', // root
  '/index.html',
  '/assets/icons/android-chrome-192x192.png',
  '/assets/icons/android-chrome-512x512.png',
  '/assets/icons/apple-touch-icon.png',
  '/assets/icons/favicon-16x16.png',
  '/assets/icons/favicon-32x32.png',
  '/assets/icons/favicon.ico',
  '/assets/images/bloxorz.jpg',
  '/assets/images/eagler.jpg',
  '/assets/images/fancypantsadventures1.jpg',
  '/assets/images/fancypantsadventures2.jpg',
  '/assets/images/fancypantsadventures3.jpg',
  '/assets/images/FNAW.jpg',
  '/assets/images/learn2fly.jpg',
  '/assets/images/retrobowl.jpg',
  '/home/bloxorz/index.html',
  '/home/eagler/index.html',
  '/home/fancypantsadventures1/index.html',
  '/home/fancypantsadventures2/index.html',
  '/home/fancypantsadventures3/index.html',
  '/home/FNAW/index.html',
  '/home/learn2fly/index.html',
  '/home/gm/gm.js',
  '/home/gm/gm.css',
  '/home/styles.css',
  '/styles.css',
  '/script.js',
  '/site.webmanifest'
];

// Install the service worker and cache essential files
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Caching essential files');
        return cache.addAll(CACHE_URLS).then(() => {
            console.log('Cached!');
        });
      })
  );
});

// Activate the service worker and remove old caches
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }  
        })
      );
    })
  );
  // Skip waiting for the new SW to take control immediately
  self.skipWaiting();
});

// Fetch files and return from cache if available
self.addEventListener('fetch', (event) => {
    // Only handle requests from the same origin as the service worker
    if (event.request.url.startsWith(self.location.origin)) {
      event.respondWith(
        caches.match(event.request)
          .then((cachedResponse) => {
            if (cachedResponse) {
              return cachedResponse;
            }
  
            return fetch(event.request).then((networkResponse) => {
              if (networkResponse && networkResponse.status === 200) {
                const clonedResponse = networkResponse.clone();
                caches.open(CACHE_NAME).then((cache) => {
                  cache.put(event.request, clonedResponse).catch((error) => {
                    console.error('Failed to cache:', error);
                  });
                });
              }
              return networkResponse;
            });
          })
      );
    } else {
      // Ignore requests not my domain(e.g., chrome-extension://)
      return fetch(event.request);
    }
});
  
// Listen for push notifications or background sync events (optional)
self.addEventListener('push', (event) => {
  const options = {
    body: event.data ? event.data.text() : 'New update available!',
    icon: '/assets/icons/android-chrome-192x192.png',
    badge: '/assets/icons/android-chrome-192x192.png'
  };

  event.waitUntil(
    self.registration.showNotification('Calculator PWA', options)
  );
});
