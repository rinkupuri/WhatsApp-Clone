"use client";

import { io } from "socket.io-client";
let conections = 0;

export const socket = io("http://localhost:8800");
socket.on("connect", () => {
  if (conections > 1) socket.emit("leave");
  conections++;
  console.log("Connected to server", { id: socket.id });
});
