import { precacheAndRoute } from "workbox-precaching";
import { clientsClaim } from "workbox-core";

declare let self: ServiceWorkerGlobalScope;
precacheAndRoute(self.__WB_MANIFEST);

const onPush = async (event: PushEvent) => {
  const message = await event.data?.json();
  let { title, description, image } = message;
  event.waitUntil(
    self.registration.showNotification(title, {
      body: description,
      icon: image,
    })
  );
};

const onNotificationClick = (event: NotificationEvent) => {
  event.notification.close();
  event.waitUntil(clients.openWindow("https://been-there.vercel.app/"));
};

self.skipWaiting();
clientsClaim();
self.addEventListener("push", onPush);
self.addEventListener("notificationclick", onNotificationClick);
