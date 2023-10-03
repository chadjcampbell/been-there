import axios from "axios";

export const FRONTEND_URL = import.meta.env.VITE_FRONTEND_URL;
export const VAPID_PUBLIC = import.meta.env.VITE_VAPID_PUBLIC;

async function regSw() {
  if ("serviceWorker" in navigator) {
    let url = FRONTEND_URL + "/sw.js";
    const reg = await navigator.serviceWorker.register(url, { scope: "/" });
    console.log("service config is", { reg });
    return reg;
  }
  throw Error("serviceworker not supported");
}

async function subscribe(serviceWorkerReg: ServiceWorkerRegistration) {
  let subscription = await serviceWorkerReg.pushManager.getSubscription();
  console.log({ subscription });
  if (subscription === null) {
    subscription = await serviceWorkerReg.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: VAPID_PUBLIC,
    });
    axios.post("/subscribe", subscription);
  }
}

export { regSw, subscribe };
