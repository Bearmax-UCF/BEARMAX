import express from "express";
import mongoose from "mongoose";
const app = express();
import { createServer } from "http";
import cors from "cors";
//const https = require("https");
const server = createServer(app);
import { Server } from "socket.io";
const io = new Server(server);
import setupAuthSvc from "./services/auth";

import registerHandlers from "./eventHandlers";
import routes from "./routes";

app.use(cors());
app.use(express.urlencoded({ extended: true }))
app.use(express.json());

// Setup MongoDB Connection
const dbClient = mongoose
  .connect(process.env.MONGO_URI || "mongodb://user:user@127.0.0.1:27017/bearmax")
  .then(m => {
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

//const isProduction = process.env.NODE_ENV === 'production';


const port = process.env.PORT || 8080;
server.listen(port, () => console.log(`server started at port: ${port}`));
