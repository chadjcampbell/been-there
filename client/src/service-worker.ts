import { precacheAndRoute } from "workbox-precaching";
import { clientsClaim } from "workbox-core";

declare let self: ServiceWorkerGlobalScope;
precacheAndRoute(self.__WB_MANIFEST);

let inView = false;

const onPush = async (event: PushEvent) => {
  if (!inView) {
    const message = await event.data?.json();
    let { title, description, image } = message;
    event.waitUntil(
      self.registration.showNotification(title, {
        body: description,
        icon: image,
      })
    );
  }
};

const onNotificationClick = (event: NotificationEvent) => {
  event.notification.close();
  event.waitUntil(clients.openWindow("https://been-there.vercel.app/"));
};

self.skipWaiting();
clientsClaim();
self.addEventListener("message", (event) => {
  if (event.data.pageHidden) {
    inView = true;
  } else {
    inView = false;
  }
});
self.addEventListener("push", onPush);
self.addEventListener("notificationclick", onNotificationClick);
