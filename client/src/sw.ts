import { precacheAndRoute } from "workbox-precaching";
import { clientsClaim } from "workbox-core";

declare let self: ServiceWorkerGlobalScope;

function onPush() {
  return;
}

function onNotificationClick() {
  return;
}

precacheAndRoute(self.__WB_MANIFEST);
self.skipWaiting();
clientsClaim();
self.addEventListener("push", onPush);
self.addEventListener("notificationclick", onNotificationClick);
