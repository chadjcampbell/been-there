import axios from "axios";
import { BACKEND_URL } from "../redux/features/auth/authService";

export const FRONTEND_URL = import.meta.env.VITE_FRONTEND_URL;
export const VAPID_PUBLIC = import.meta.env.VITE_VAPID_PUBLIC;

async function regSw() {
  if ("serviceWorker" in navigator) {
    const reg = navigator.serviceWorker.register(
      import.meta.env.MODE === "production"
        ? "./service-worker.js"
        : "./dev-sw.js?dev-sw",
      { type: import.meta.env.MODE === "production" ? "classic" : "module" }
    );
    return reg;
  }
}

async function subscribe(
  serviceWorkerReg: ServiceWorkerRegistration | undefined
) {
  if (serviceWorkerReg) {
    let subscription = await serviceWorkerReg.pushManager.getSubscription();
    if (subscription === null) {
      subscription = await serviceWorkerReg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: VAPID_PUBLIC,
      });
      axios.post(BACKEND_URL + "/notification/subscribe", subscription);
    }
  }
}

export { regSw, subscribe };
