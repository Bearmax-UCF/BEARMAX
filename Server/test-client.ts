import { io } from "socket.io-client";

console.log("Attempting to connect");

/*
carewithbearmax.com
const TOKEN =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NDM3MDc1ZmY2MjQ4MjgzMDJlZTMwNjciLCJqdGkiOiI0YWY0ZDk0ZS01YWVkLTRkMzItYTQyNy1jYTU1ZjIwZTNmOTkiLCJpYXQiOjE2ODE5MjY2OTksImV4cCI6MTY4MTk2OTg5OX0.bjL-tptKMTK8i8ag7nxVz2NWpgDf3knQOuYqbK21Jc8";
const USERID = "6437075ff624828302ee3067";
*/

/*
dev
*/
const TOKEN =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NDM3MzUzNGUzZDBiZDBlMDIwMDY3N2IiLCJqdGkiOiJlMTgwNWY3MS1jNjM3LTQ3NzUtYmM5Zi0xZTdhM2IxNWEwNWIiLCJpYXQiOjE2ODE5Mjg1NTMsImV4cCI6MTY4MTk3MTc1M30.T7HaQtybROln8mYtghY0FIruxMw0mIJ-G99OAGD-p3g";
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
