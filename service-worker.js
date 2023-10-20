self.addEventListener('install', function(event) {
    event.waitUntil(
      caches.open('app-shell-v1').then(function(cache) {
        return cache.addAll([
          '/',
          '/index.html',
          '/styles/index.css',
          '/script/index.js',
          '/script/lang.js',
          '/languages/ar.json',
          '/languages/en.json',
          '/languages/id.json'
        ]);
      })
    );
  });
  
  self.addEventListener('fetch', function(event) {
    event.respondWith(
      caches.match(event.request).then(function(response) {
        return response || fetch(event.request);
      })
    );
  });
  
  self.addEventListener('activate', function(event) {
    event.waitUntil(
      caches.keys().then(function(cacheNames) {
        return Promise.all(
          cacheNames.filter(function(cacheName) {
            return cacheName.startsWith('app-shell-') && cacheName !== 'app-shell-v2';
          }).map(function(cacheName) {
            return caches.delete(cacheName);
          })
        );
      })
    );
  });
  