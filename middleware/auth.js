const { verifyJwt } = require('../utilities/Security');
const AuthenticationError = require('../errors/AuthenticationError');

function authenticateToken(req, res, next) {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        next(new AuthenticationError("Token not provided"));
        return;
    }
    try {
        const payload = verifyJwt(token);
        req.user = payload;
        next();
    } catch (err) {
        next(new AuthenticationError("Invalid token"));
    }
}

module.exports = { authenticateToken };