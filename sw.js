const CACHE_NAME = 'counter-app-v17'; //

const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/style.css',        // 있으면 포함
  '/sw.js',
  // 다른 필요한 리소스들 추가
];

// 설치 시 캐시
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

// 요청 시 캐시 사용
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});

// 이전 캐시 제거
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames
          .filter(name => name !== CACHE_NAME)
          .map(name => caches.delete(name))
      );
    })
  );
});
