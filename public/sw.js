const CACHE_NAME = "tbg-cache-v3";
const OFFLINE_URLS = ["/", "/manifest.webmanifest"];
const isLocal =
  self.location.hostname === "localhost" ||
  self.location.hostname === "127.0.0.1";

self.addEventListener("install", (event) => {
  if (isLocal) {
    self.skipWaiting();
    return;
  }

  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(OFFLINE_URLS))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(keys.map((k) => caches.delete(k)));

      // En local: apagar SW sin navegar (evita bucles de reload).
      if (isLocal) {
        await self.registration.unregister();
        return;
      }

      await self.clients.claim();
    })()
  );
});

self.addEventListener("fetch", (event) => {
  // En local no interceptar nada.
  if (isLocal) return;
  if (event.request.method !== "GET") return;

  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return;

  if (event.request.mode === "navigate") {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
          return response;
        })
        .catch(() =>
          caches.match(event.request).then((cached) => cached || caches.match("/"))
        )
    );
    return;
  }

  if (url.pathname.startsWith("/_next/")) return;

  event.respondWith(
    caches.match(event.request).then((cached) => {
      const fetched = fetch(event.request)
        .then((response) => {
          if (response.ok) {
            const copy = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
          }
          return response;
        })
        .catch(() => cached);
      return cached || fetched;
    })
  );
});
