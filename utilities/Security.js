const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || "yourSecretKey";
const JWT_SALT_ROUNDS = process.env.JWT_SALT_ROUNDS || 5;
const JWT_EXPIRE_TIME = process.env.JWT_EXPIRE_TIME || '1h';

function hashPwd(password) {
    return bcrypt.hash(password, JWT_SALT_ROUNDS);
}

function comparePwds(password, hashedPwd) {
    return bcrypt.compare(password, hashedPwd);
}

function generateJwt(payload) {
    return jwt.sign(payload, JWT_SECRET_KEY, {
        expiresIn: JWT_EXPIRE_TIME
    });
}

function verifyJwt(token) {
    return jwt.verify(token, JWT_SECRET_KEY);
}

module.exports = { hashPwd, comparePwds, generateJwt, verifyJwt };