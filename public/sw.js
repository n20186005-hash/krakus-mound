/* Krakus Mound – Service Worker
 * Network-first for navigation, stale-while-revalidate for assets,
 * offline fallback to the Polish home page (/pl).
 */
const PAGES_CACHE = 'krakusmound-pages-v1';
const ASSETS_CACHE = 'krakusmound-assets-v1';
const OFFLINE_URL = '/pl';

self.addEventListener('install', (event) => {
  event.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((k) => k.startsWith('krakusmound-') && k !== PAGES_CACHE && k !== ASSETS_CACHE)
            .map((k) => caches.delete(k))
        )
      )
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const request = event.request;
  if (request.method !== 'GET') return;

  // Navigations: network first, fall back to cached /pl when offline.
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const copy = response.clone();
          caches.open(PAGES_CACHE).then((cache) => {
            cache.put(OFFLINE_URL, copy);
            cache.put('/pl', response.clone());
          });
          return response;
        })
        .catch(() =>
          caches.match(request).then((hit) => {
            if (hit) return hit;
            return caches.match(OFFLINE_URL).then((fallback) => fallback || caches.match('/'));
          })
        )
    );
    return;
  }

  // Other GET requests: cache-first with background update.
  event.respondWith(
    caches.match(request).then((hit) => {
      const network = fetch(request)
        .then((response) => {
          if (response && response.ok) {
            const copy = response.clone();
            caches.open(ASSETS_CACHE).then((cache) => cache.put(request, copy));
          }
          return response;
        })
        .catch(() => hit);
      return hit || network;
    })
  );
});
