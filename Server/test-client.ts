import { io } from "socket.io-client";

console.log("Attempting to connect");

const TOKEN =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NDM3MzUzNGUzZDBiZDBlMDIwMDY3N2IiLCJqdGkiOiJmZDRhOGRjYS1jNjZhLTQ2M2YtYjVjNi0xYjIyYjc4NTY0MTMiLCJpYXQiOjE2ODE5MjU4MjYsImV4cCI6MTY4MTk2OTAyNn0.7KGTuqgk3CZWQdJXUNZtZ5izZXzOHtMp57lKRydgdfc";
const USERID = "64373534e3d0bd0e0200677b";

// @ts-ignore
const socket = io("http://localhost:8080", {
	query: {
		userID: USERID,
	},
	extraHeaders: {
		Authorization: "Bearer " + TOKEN,
	},
});

const getNextVal = (lastVal: number) => {
	const newVal = Math.max(0, Math.random() * 10 - 5 + lastVal);
	return newVal;
};

socket.on("connect", () => {
	console.log("Client connected!");

	let last = 450;
	setInterval(() => {
		// console.log("Sending!");
		last = getNextVal(last);
		socket.emit("GSR", JSON.stringify({ value: last, ts: new Date() }));
	}, 71);
});

socket.on("disconnect", () => {
	console.log("disconnected!");
});
