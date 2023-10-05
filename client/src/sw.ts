import { precacheAndRoute } from "workbox-precaching";
import { clientsClaim } from "workbox-core";

declare let self: ServiceWorkerGlobalScope;
precacheAndRoute(self.__WB_MANIFEST);

function onPush() {
  return;
}

function onNotificationClick() {
  return;
}

self.skipWaiting();
clientsClaim();
self.addEventListener("push", onPush);
self.addEventListener("notificationclick", onNotificationClick);
