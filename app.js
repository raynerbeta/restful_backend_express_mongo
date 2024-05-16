// Importing required libraries and modules
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
const cors = require('cors');
const AuthenticationError = require('./errors/AuthenticationError')

// Defining constants from environment
const APP_PORT = process.env.APP_PORT || 3000;
const MONGO_HOST = process.env.MONGO_HOST || "localhost";
const MONGO_PORT = process.env.MONGO_PORT || 27017;
const MONGO_USER = process.env.MONGO_USER || "root";
const MONGO_PASS = process.env.MONGO_PASS || "OTgzNy1yYXluZXJi";
const MONGO_DB_NAME = process.env.MONGO_DB_NAME || "restful_backend";
const MONGO_URI = `mongodb://${MONGO_USER}:${MONGO_PASS}@${MONGO_HOST}:${MONGO_PORT}`;
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || "yourSecretKey";
const JWT_SALT_ROUNDS = process.env.JWT_SALT_ROUNDS || 5;

// Connection to MongoDB
const Users = require('./model/User');
mongoose.connect(MONGO_URI, { 'dbName': MONGO_DB_NAME });

const app = express();
app.use(cors());

//app.use("*", bodyParser.json());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// POST endpoint for user login
app.post('/api/login', async (req, res, next) => {
    const { usernameOrEmail, password } = req.body;
    const user = await Users.findOne({
        $or: [{
            username: usernameOrEmail
        },
        {
            email: usernameOrEmail
        }]
    });
    if (!user) {
        next(new AuthenticationError("User not found"));
        return;
    }
    let validationResult = false;
    try {
        validationResult = await bcrypt.compare(password, user.password || '');
    } catch (error) {
        next(new AuthenticationError("Error while validating password"));
        return;
    }
    if (!validationResult) {
        next(new AuthenticationError("Incorrect password"));
        return;
    }
    const payload = {
        username: user.username,
        email: user.email
    };
    const token = jwt.sign(payload, JWT_SECRET_KEY, {
        expiresIn: '1h'
    })
    res.status(200).send({
        token,
        message: "Successful login"
    });
});

// Middleware for route protection
function authenticateToken(req, res, next) {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        next(new AuthenticationError("Token not provided"));
        return;
    }
    jwt.verify(token, JWT_SECRET_KEY, (err, user) => {
        if (err) {
            next(new AuthenticationError("Invalid token"));
            return;
        }
        req.user = user;
        next();
    })
}

app.get('/api/secure', authenticateToken, (req, res)=>{
    res.send({message: "OK"})
})

// Global error handler
app.use((err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.message || "Internal server error";
    console.log(err.stack);
    res.status(err.statusCode).json({
        statusCode: err.statusCode,
        message: err.message
    })
})

// Starting the server and listening on the specified port
app.listen(APP_PORT, () => {
    console.log(`Server is running on http://localhost:${APP_PORT}`);
});