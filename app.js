const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const Mongo = require('./utilities/Mongo');
const authRoutes = require('./routes/auth.js');
const protectedRoutes = require('./routes/protected');
const ValidationError = require('./errors/ValidationError');

// Defining constants from environment
const APP_PORT = process.env.APP_PORT || 3000;
const MONGO_HOST = process.env.MONGO_HOST || "localhost";
const MONGO_PORT = process.env.MONGO_PORT || 27017;
const MONGO_USER = process.env.MONGO_USER || "root";
const MONGO_PASS = process.env.MONGO_PASS || "NzU0OS1yYXluZXJi";
const MONGO_DB_NAME = process.env.MONGO_DB_NAME || "restful_backend";

// Connection to MongoDB
const mongo = new Mongo(MONGO_HOST, MONGO_PORT, MONGO_USER, MONGO_PASS, MONGO_DB_NAME);
mongo.Connect()
    .catch((err) => {
        console.log(err.stack);
        process.exit(1);
    });

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/auth', authRoutes);
app.use('/protected', protectedRoutes);

app.all('*', (req, res, next) => {
    next(new ValidationError(`You requested a non-existent resource: ${req.originalUrl}`));
});

// Global error handler
app.use((err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.message || "Internal server error";
    console.log(err.stack);
    res.status(err.statusCode).json({
        statusCode: err.statusCode,
        message: err.message
    })
});

// Starting the server and listening on the specified port
app.listen(APP_PORT, () => {
    console.log(`Server is running on http://localhost:${APP_PORT}`);
});