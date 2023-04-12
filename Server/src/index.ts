import express from "express";
import mongoose from "mongoose";
const app = express();
import { createServer } from "http";
import cors from "cors";
import { Server } from "socket.io";
import constants from "./utils/constants";

const server = createServer(app);
const io = new Server(server);

import setupAuthSvc from "./services/auth";
import registerHandlers from "./eventHandlers";
import routes from "./routes";
import path from "path";
import { createProxyMiddleware } from "http-proxy-middleware";

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// // Setup MongoDB Connection
// const dbClient = mongoose.connect(constants.mongo_uri).then((m) => {
// 	console.log("CONNECTED TO MONGODB");
// 	return m.connection.getClient();
// });

// // Setup Auth (Passport & Sessions)
// // @ts-ignore
// setupAuthSvc(app, dbClient);

// Setup Routes
app.use("/", routes);

// Serve the frontend app
if (constants.isProduction) {
	app.use(
		"/static",
		express.static(path.join(__dirname, "../../Client/build/static/"))
	);
	app.get("*", function (_, res) {
		res.sendFile("index.html", {
			root: path.join(__dirname, "../../Client/build/"),
		});
	});
} else {
	app.use(
		"*",
		createProxyMiddleware({ target: "http://localhost:3000", ws: true })
	);
}

// Setup socketio
registerHandlers(io);
console.log("Socket server initialized");

server.listen(constants.port, () =>
	console.log(`server started at port: ${constants.port}`)
);
