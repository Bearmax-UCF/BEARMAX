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

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Setup MongoDB Connection
const dbClient = mongoose.connect(constants.mongo_uri).then((m) => {
	console.log("CONNECTED TO MONGODB");
	return m.connection.getClient();
});

// Setup Auth (Passport & Sessions)
// @ts-ignore
setupAuthSvc(app, dbClient);

// Setup Routes
app.use("/", routes);

// Setup socketio
registerHandlers(io);
console.log("Socket server initialized");

server.listen(constants.port, () =>
	console.log(`server started at port: ${constants.port}`)
);
