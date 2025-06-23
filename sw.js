// 최신 캐시를 위한 버전 이름
const CACHE_NAME = "counter-cache-v2";

// 캐시할 파일들 (필요한 파일 경로 추가)
const urlsToCache = [
  "./",
  "./index.html",
  "./manifest.json",
  "./icon.png", // 아이콘 파일이 있다면
];

// 설치 시 캐시 저장
self.addEventListener("install", (event) => {
  self.skipWaiting(); // 설치 후 바로 활성화
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

// 이전 캐시 제거 + 새 서비스워커 적용
self.addEventListener("activate", (event) => {
  clients.claim(); // 모든 클라이언트에 즉시 적용
  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key); // 이전 캐시 삭제
          }
        })
      );
    })
  );
});

// 요청이 있으면 캐시 먼저 확인하고 없으면 네트워크 요청
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
