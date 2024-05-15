// Importing required libraries and modules
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require("bcrypt");

// Defining constants from environment
const APP_PORT = process.env.APP_PORT || 3000;
const MONGO_HOST = process.env.MONGO_HOST || "localhost";
const MONGO_PORT = process.env.MONGO_PORT || 27017;
const MONGO_USER = process.env.MONGO_USER || "root";
const MONGO_PASS = process.env.MONGO_PASS || "your_password";
const MONGO_DB_NAME = process.env.MONGO_DB_NAME || "restful_backend";
const MONGO_URI = `mongodb://${MONGO_USER}:${MONGO_PASS}@${MONGO_HOST}:${MONGO_PORT}`;

// Connection to MongoDB
const Users = require('./model/User');
mongoose.connect(MONGO_URI, { 'dbName': MONGO_DB_NAME });

const app = express();

app.use("*", bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// POST endpoint for user login
app.post('/api/login', async (req, res) => {
    const body = req.body;
    const { username, password } = body;
    const users = await Users.find({ username, password });
    if (users.length > 0) {
        res.send("User Logged In");
    } else {
        res.send("User Information incorrect");
    }
});

// Starting the server and listening on the specified port
app.listen(APP_PORT, () => {
    console.log(`Server is running on http://localhost:${APP_PORT}`);
});