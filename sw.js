// Mochila Mágica – Service Worker (offline first)
// Sube el número de versión cada vez que cambies archivos de la app.
const VERSION = 'v7';
const CACHE_APP = `mochila-app-${VERSION}`;
const CACHE_FONTS = 'mochila-fonts-v1';

const APP_SHELL = [
  './',
  './index.html',
  './manifest.json',
  './js/pwa.js',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/maskable-512.png',
  './icons/apple-touch-icon-180.png',
  './icons/favicon-32.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_APP).then((c) => c.addAll(APP_SHELL))
  );
  // No hacemos skipWaiting aquí: pwa.js avisa al usuario y lo pide con un mensaje.
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(
        keys.filter((k) => k.startsWith('mochila-app-') && k !== CACHE_APP)
            .map((k) => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('message', (event) => {
  if (event.data === 'SKIP_WAITING') self.skipWaiting();
});

// Red primero (con límite de tiempo) y caché como respaldo
function networkFirst(request, cacheName, timeoutMs) {
  return new Promise((resolve) => {
    let settled = false;
    const fallback = () =>
      caches.match(request, { ignoreSearch: true })
        .then((r) => r || caches.match('./index.html'))
        .then((r) => r || Response.error());
    const timer = setTimeout(() => {
      if (!settled) { settled = true; fallback().then(resolve); }
    }, timeoutMs);
    fetch(request).then((res) => {
      clearTimeout(timer);
      if (res && res.ok) {
        const copy = res.clone();
        caches.open(cacheName).then((c) => c.put(request, copy));
      }
      if (!settled) { settled = true; resolve(res); }
    }).catch(() => {
      clearTimeout(timer);
      if (!settled) { settled = true; fallback().then(resolve); }
    });
  });
}

// Caché primero y se actualiza en segundo plano
function staleWhileRevalidate(request, cacheName) {
  return caches.open(cacheName).then((cache) =>
    cache.match(request).then((cached) => {
      const network = fetch(request).then((res) => {
        if (res && (res.ok || res.type === 'opaque')) cache.put(request, res.clone());
        return res;
      }).catch(() => cached);
      return cached || network;
    })
  );
}

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);

  // Páginas: red primero (3 s) para recibir actualizaciones; sin red, versión guardada
  if (req.mode === 'navigate') {
    event.respondWith(networkFirst(req, CACHE_APP, 3000));
    return;
  }

  // Tipografías de Google: se guardan la primera vez que hay internet
  if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') {
    event.respondWith(staleWhileRevalidate(req, CACHE_FONTS));
    return;
  }

  // Archivos propios
  if (url.origin === self.location.origin) {
    event.respondWith(staleWhileRevalidate(req, CACHE_APP));
  }
});
