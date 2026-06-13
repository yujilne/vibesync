// VibeSync Service Worker
// Strategy:
//   Navigation requests  → network-first, cached / as offline fallback
//   Same-origin assets   → stale-while-revalidate (cache → network update in bg)
//   /api/* /auth/*       → network-only (Spotify data, no caching)
//   Cross-origin         → pass through untouched

const CACHE = 'vibesync-v1';

// Pre-cache only the stable shell files whose paths never change
const SHELL = [
  '/',
  '/manifest.json',
  '/icons/icon-192.png',
  '/icons/icon-512.png',
];

// ── Install: cache the shell ───────────────────────────────────
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(SHELL))
  );
  self.skipWaiting(); // activate immediately without waiting for existing clients
});

// ── Activate: clean up old cache versions ─────────────────────
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim(); // take control of existing open tabs
});

// ── Fetch ─────────────────────────────────────────────────────
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);

  // Cross-origin: let browser handle (Spotify API, Google Fonts, etc.)
  if (url.origin !== self.location.origin) return;

  // API / auth routes: always go to network, never cache
  if (url.pathname.startsWith('/api/') || url.pathname.startsWith('/auth/')) return;

  // Vite dev-server internals: skip in development
  if (url.pathname.startsWith('/@') || url.pathname.startsWith('/__')) return;

  // Navigation (HTML page loads) — network-first, fall back to cached shell
  if (req.mode === 'navigate') {
    e.respondWith(
      fetch(req)
        .then(res => {
          const clone = res.clone();
          caches.open(CACHE).then(c => c.put(req, clone));
          return res;
        })
        .catch(() => caches.match('/'))
    );
    return;
  }

  // Static assets (JS, CSS, images, fonts) — stale-while-revalidate
  e.respondWith(
    caches.open(CACHE).then(async cache => {
      const cached = await cache.match(req);

      const networkReq = fetch(req).then(res => {
        if (res && res.ok) cache.put(req, res.clone());
        return res;
      }).catch(() => null);

      // Return cached immediately if available (network updates cache silently)
      if (cached) {
        networkReq; // fire and forget — updates cache in background
        return cached;
      }

      // No cache: wait for network
      const fresh = await networkReq;
      return fresh || new Response('Offline — check your connection', {
        status: 503,
        headers: { 'Content-Type': 'text/plain' },
      });
    })
  );
});
