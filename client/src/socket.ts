import { io, Socket } from "socket.io-client";

export const socket: Socket = io(import.meta.env.VITE_BACKEND_URL, {
  autoConnect: false,
  withCredentials: true,
});
