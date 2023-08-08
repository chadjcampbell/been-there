import { io } from "socket.io-client";

export const socket = new io(import.meta.env.VITE_BACKEND_URL, {
  autoConnect: false,
  withCredentials: true,
});
