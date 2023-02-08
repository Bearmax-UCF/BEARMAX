import { readFileSync } from "fs";
import { io } from "socket.io-client";

// @ts-ignore
const socket = io("https://localhost:8080", {
  key: readFileSync(`${__dirname}/certs/client-key.pem`),
  cert: readFileSync(`${__dirname}/certs/client-crt.pem`),
  ca: [
    readFileSync(`${__dirname}/certs/server-crt.pem`)
  ]
});

socket.on("connect", () => {
  console.log("connected!");
  socket.on("yo", (a) => console.log(a));
  socket.emit("yo", {content: "hi" });
});

socket.on("disconnect", () => {
  console.log("disconnected!");
});
