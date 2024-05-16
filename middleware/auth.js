const jwt = require('jsonwebtoken');
const AuthenticationError = require('../errors/AuthenticationError');

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

module.exports = { authenticateToken };