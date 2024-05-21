"use client";

import { io } from "socket.io-client";
let conections = 0;

export const socket = io("http://localhost:8800");
