const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/auth.js');

// Defining constants from environment
const APP_PORT = process.env.APP_PORT || 3000;
const MONGO_HOST = process.env.MONGO_HOST || "localhost";
const MONGO_PORT = process.env.MONGO_PORT || 27017;
const MONGO_USER = process.env.MONGO_USER || "root";
const MONGO_PASS = process.env.MONGO_PASS || "MjkwNjAtcmF5bmVy";
const MONGO_DB_NAME = process.env.MONGO_DB_NAME || "restful_backend";
const MONGO_URI = `mongodb://${MONGO_USER}:${MONGO_PASS}@${MONGO_HOST}:${MONGO_PORT}`;

// Connection to MongoDB
mongoose.connect(MONGO_URI, { dbName: MONGO_DB_NAME })
    .catch((err) => {
        console.log(`Database connection error:\n${err.stack}`);
        process.exit(1);
    });

const app = express();
app.use(cors());

//app.use("*", bodyParser.json());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/auth', authRoutes);

// Middleware for route protection
/*
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
*/
/*
app.get('/api/secure', authenticateToken, (req, res) => {
    res.send({ message: "OK" })
})
*/

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
/*
app.all('*', (req, res) => {
    res.status(404).json({
        statusCode: 404,
        message: `You requested a non-existent resource: ${req.originalUrl}`
    });
});
*/

// Starting the server and listening on the specified port
app.listen(APP_PORT, () => {
    console.log(`Server is running on http://localhost:${APP_PORT}`);
});