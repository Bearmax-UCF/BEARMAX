import { io } from "socket.io-client";

console.log("Attempting to connect");

const TOKEN =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NDM3MzUzNGUzZDBiZDBlMDIwMDY3N2IiLCJqdGkiOiI3YWEzYmYyZC04NThlLTQ2NzYtODAxOC0xN2FiZWM5NjMwOGIiLCJpYXQiOjE2ODE4NDg2MzQsImV4cCI6MTY4MTg5MTgzNH0.DMt0ruE32_6nx1FAVml-2j1KQ0IiLZCck5sToZgwwH8";
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
	const newVal = Math.max(0, Math.random() * 50 - 25 + lastVal);
	return newVal;
};

socket.on("connect", () => {
	console.log("Client connected!");

	let last = 3000;
	setInterval(() => {
		last = getNextVal(last);
		socket.emit("GSR", last, new Date());
	}, 200);
});

// socket.on("GSR", (value, ts) => {
// 	console.log(value + " - " + ts);
// });

socket.on("disconnect", () => {
	console.log("disconnected!");
});
