const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
//const cloudinary = require("cloudinary");
const multer = require("multer");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Connections to the DB Models
const userReg = require("./../models/User.js");
const temp = require("./../models/Temperature.js");
const sensorCal = require("./../models/SensorCalibration.js");
const respRate = require("./../models/RespitoryRate.js");
const drNotes = require("./../models/PhysicianNotes.js");
const heartRate = require("./../models/HeartRate.js");
const gsr = require("./../models/GalvanicSkinResponse.js");
const extraChild = require("./../models/ExtraChildInfo.js");
const emotionRecon = require("./../models/EmotionRecognition.js");

const mongoose = require("mongoose");
const { json } = require("body-parser");
const { ObjectID, ObjectId } = require("bson");

// For frontend CORS
router.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "http://localhost:3002"); // update to match the domain you will make the request from
	res.header("Access-Control-Allow-Origin", "http://localhost:3001"); // change the 3001 port the port where your webapp is running from!!
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept",
	);
	next();
});


