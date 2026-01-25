const CACHE_NAME = 'elimu-platform-v1';
const ASSETS_TO_CACHE = [
    './',
    './index.html',
    './dashboard.html',
    './analytics.html',
    './boys.html',
    './girls.html',
    './institutions.html',
    './overall.html',
    './subjects.html',
    './style.css',
    './auth.js',
    './layout.js',
    './schools.json',
    './subjects.json',
    './images/1.jpg'
];

// Install Event
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Opened cache');
                return cache.addAll(ASSETS_TO_CACHE);
            })
    );
});

// Fetch Event
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                // Cache hit - return response
                if (response) {
                    return response;
                }
                return fetch(event.request);
            })
    );
});

// Activate Event (Cleanup old caches)
self.addEventListener('activate', (event) => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
