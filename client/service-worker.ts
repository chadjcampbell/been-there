const cacheName: string = "my-app-cache-v1";
const cacheAssets: string[] = ["/"];

self.addEventListener("install", (evt: ExtendableEvent) => {
  evt.waitUntil(
    caches.open(cacheName).then((cache: Cache) => {
      return cache.addAll(cacheAssets);
    })
  );
});

self.addEventListener("fetch", (event: FetchEvent) => {
  event.respondWith(
    caches.match(event.request).then((response: Response | undefined) => {
      return response || fetch(event.request);
    })
  );
});
