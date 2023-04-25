import { io } from "socket.io-client";

console.log("Attempting to connect");

/*
carewithbearmax.com
*/
const TOKEN =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NDQxZWYyZGVmZTBmYjhhYWNhMWY5NWIiLCJqdGkiOiI4NTM2MjYwMi03YWEwLTQwNjEtODJmMC0xYzg1MzA2YTIyMDgiLCJpYXQiOjE2ODIwODY1ODgsImV4cCI6MTY4MjEyOTc4OH0.rRBmZRzSWSOVXdt91XMEk_xv6y1XkKOu_7JWV6AZRdM";
const USERID = "6441ef2defe0fb8aaca1f95b";
const URL = "https://carewithbearmax.com";

/*
dev

const TOKEN =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NDM3MzUzNGUzZDBiZDBlMDIwMDY3N2IiLCJqdGkiOiJlMTgwNWY3MS1jNjM3LTQ3NzUtYmM5Zi0xZTdhM2IxNWEwNWIiLCJpYXQiOjE2ODE5Mjg1NTMsImV4cCI6MTY4MTk3MTc1M30.T7HaQtybROln8mYtghY0FIruxMw0mIJ-G99OAGD-p3g";
const USERID = "64373534e3d0bd0e0200677b";
*/

// @ts-ignore
const socket = io(URL, {
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
