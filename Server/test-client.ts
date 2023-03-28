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
  console.log("Client connected!");
  socket.on("speak", (msg: string) => console.log("Robot says: '" + msg + "'"))

  socket.emit("speak", "Hello! I am BEARMAX.")
  socket.emit("emotionGame", "start");
  setTimeout(() => socket.emit("emotionGame", "stop"), 500)
  setTimeout(() => socket.emit("recalibrate"), 1000)
  setTimeout(() => {
    const stats = {
      Correct: [10, 3, 4, 9],
      Wrong: [8, 3, 4, 1],
      NumPlays: 42,
      UserID: "notarealid",
    }
    const statsJSON = JSON.stringify(stats)
    console.log("Sending:", statsJSON)
    socket.emit("emotionGameStats", statsJSON)
  }, 1500)
});

socket.on("disconnect", () => {
  console.log("disconnected!");
});
