// MERN = Mongo + Express + React + Node
// Development = Node.js server + Reasct server
// Production = Node.js server + Static react files

const express = require("express");
const { connections } = require("mongoose");
const mongoose = require("mongoose");

//require("dotenv").config();

const cors = require("cors");

const https = require("https");
const fs = require("fs");

const app = express();
const routes = require("./API/route");

var bodyParser = require("body-parser");
const port = process.env.PORT || 6969;

app.use(express.json());
app.use("/api", routes);
app.use(cors());
app.use(bodyParser.json({ extended: false }));

app.listen (port, () => {
    console.log("server started at port: " + port);
});

mongoose.connect(process.env.DATABASE_URI);
const database = mongoose.connection;

database.on("error", (error) => {
    console.log(error);
});

database.once("connected", () => {
    console.log("Database Connected!");
});

app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept, Authorization",
	);
	res.setHeader(
		"Access-Control-Allow-Methods",
		"GET, POST, PATCH, DELETE, OPTIONS",
	);
	next();
});