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
      badge: "./pwa-192x192.png",
    })
  );
};

const onNotificationClick = (event: NotificationEvent) => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: "window" }).then(function (clientList) {
      // Check if web app is already open in a tab
      for (var i = 0; i < clientList.length; i++) {
        var client = clientList[i];
        if ("focus" in client) {
          return client.focus();
        }
      }
      // If web app is not open in any tab, open a new one
      if (clients.openWindow) {
        return clients.openWindow("https://been-there.vercel.app/"); // Replace with your URL
      }
    })
  );
};

self.skipWaiting();
clientsClaim();
self.addEventListener("push", onPush);
self.addEventListener("notificationclick", onNotificationClick);
