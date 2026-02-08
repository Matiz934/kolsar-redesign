// Service Worker for Kolsar Recykling
const CACHE_NAME = 'kolsar-v1';
const BASE_PATH = '/kolsar-redesign';
const STATIC_ASSETS = [
    BASE_PATH + '/',
    BASE_PATH + '/index.html',
    BASE_PATH + '/styles.css',
    BASE_PATH + '/google-reviews-widget.js',
    BASE_PATH + '/assets/kolsar-logo.png',
    BASE_PATH + '/assets/world-graphic.png',
    BASE_PATH + '/assets/logo-icon.svg',
    BASE_PATH + '/favicon.svg',
    BASE_PATH + '/favicon.png'
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                return cache.addAll(STATIC_ASSETS);
            })
    );
    self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames
                    .filter((name) => name !== CACHE_NAME)
                    .map((name) => caches.delete(name))
            );
        })
    );
    self.clients.claim();
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
    // Skip non-GET requests
    if (event.request.method !== 'GET') return;

    // Skip external requests (Google Fonts, Maps, etc.)
    if (!event.request.url.startsWith(self.location.origin)) {
        return;
    }

    event.respondWith(
        caches.match(event.request)
            .then((cachedResponse) => {
                if (cachedResponse) {
                    // Return cached response and update cache in background
                    fetch(event.request)
                        .then((networkResponse) => {
                            caches.open(CACHE_NAME).then((cache) => {
                                cache.put(event.request, networkResponse);
                            });
                        })
                        .catch(() => {
                            // Network failed, but we have cached response
                        });
                    return cachedResponse;
                }

                // Not in cache, fetch from network
                return fetch(event.request)
                    .then((networkResponse) => {
                        // Cache successful responses
                        if (networkResponse && networkResponse.status === 200) {
                            const responseToCache = networkResponse.clone();
                            caches.open(CACHE_NAME).then((cache) => {
                                cache.put(event.request, responseToCache);
                            });
                        }
                        return networkResponse;
                    })
                    .catch(() => {
                        // Network failed, try to return offline page or error
                        if (event.request.destination === 'document') {
                            return caches.match(BASE_PATH + '/index.html');
                        }
                    });
            })
    );
});

// Background sync for form submissions (optional)
self.addEventListener('sync', (event) => {
    if (event.tag === 'contact-form') {
        event.waitUntil(syncContactForm());
    }
});

async function syncContactForm() {
    // Background sync implementation placeholder
}
