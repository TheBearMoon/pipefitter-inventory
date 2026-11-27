const CACHE = 'pipefitter-v40';
const PRECACHE = [
  './',
  './index.html',
  './base.css?v=40',
  './style.css?v=40',
  './firebase-config.js?v=40',
  './firebase-sync.js?v=40',
  './app.js?v=40',
  './manifest.webmanifest',
  './favicon.png',
  './apple-touch-icon.png',
  './icon-192.png',
  './icon-512.png',
  './icon-maskable-192.png',
  './icon-maskable-512.png',
  './assets/parts/green-gasket.jpg',
  './assets/parts/grey-gasket.jpg',
  './assets/parts/b7-stud-bolt.jpg',
  './assets/parts/l7-stud-bolt.jpg',
  './assets/parts/b8-stainless-stud-bolt.jpg',
  './assets/parts/u-bolt.jpg',
  './assets/parts/j-bolt.jpg',
  './assets/parts/pipe-plug.jpg',
  './assets/parts/ball-valve.jpg'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) =>
      Promise.all(PRECACHE.map((u) => cache.add(new Request(u, { cache: 'reload' }))))
    )
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  const req = event.request;
  const url = new URL(req.url);

  // Network-first (revalidating HTTP cache) for same-origin app shell files so phones pick up updates immediately
  if (url.origin === self.location.origin && /\.(html|css|js|webmanifest)$|^\/?$/.test(url.pathname)) {
    event.respondWith(
      fetch(req, { cache: 'no-cache' })
        .then((res) => {
          if (res && res.ok) {
            const copy = res.clone();
            caches.open(CACHE).then((c) => c.put(req, copy));
          }
          return res;
        })
        .catch(() => caches.match(req).then((r) => r || caches.match('./index.html')))
    );
    return;
  }

  // Cache-first for images, icons, and fonts
  event.respondWith(
    caches.match(req).then((cached) => {
      if (cached) return cached;
      return fetch(req).then((res) => {
        if (res && (res.ok || res.type === 'opaque')) {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put(req, copy));
        }
        return res;
      }).catch(() => caches.match('./index.html'));
    })
  );
});
