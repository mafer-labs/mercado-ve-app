const CACHE_NAME = 'cuentaclara-v1';
const urlsToCache = [
  './',
  './index.html',
  './style.css',
  './catalogo.js',
  './manifest.json'
];

// Instalar y guardar todo en caché
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// Interceptar peticiones y servir desde caché si no hay internet
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Si el archivo está en el caché, lo devuelve al instante
        if (response) {
          return response;
        }
        // Si no está, va a buscarlo a internet
        return fetch(event.request);
      })
  );
});
