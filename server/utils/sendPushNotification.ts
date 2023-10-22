import { eq } from "drizzle-orm";
import db from "../db";
import { Notifications, subscriptions } from "../schema";
import webpush from "web-push";

export const sendPushNotification = async (notification: Notifications) => {
  const userSubscriptions = await db.query.subscriptions.findMany({
    where: eq(subscriptions.user_id, notification.user_id),
  });
  if (userSubscriptions.length) {
    const options = {
      vapidDetails: {
        subject: "mailto:chadjcampbell@gmail.com",
        publicKey: process.env.VAPID_PUBLIC as string,
        privateKey: process.env.VAPID_PRIVATE as string,
      },
    };
    userSubscriptions.forEach(async (sub) => {
      const subInfo = {
        endpoint: sub.endpoint,
        keys: {
          p256dh: sub.p256dh,
          auth: sub.auth,
        },
      };
      try {
        await webpush.sendNotification(
          subInfo,
          JSON.stringify({
            title: "Been There",
            description: notification.content,
            image: "./globe-pins.webp",
          }),
          options
        );
      } catch (err) {
        console.log(err, sub.id);
      }
    });
  }
};
