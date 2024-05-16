const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const ValidationError = require('../errors/ValidationError');
const AuthenticationError = require('../errors/AuthenticationError');
const DatabaseError = require('../errors/DatabaseError');
const Users = require('../model/User');

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || "yourSecretKey";
const JWT_SALT_ROUNDS = process.env.JWT_SALT_ROUNDS || 5;
const JWT_EXPIRE_TIME = process.env.JWT_EXPIRE_TIME || '1h';

async function RegisterUser(req, res, next) {
    const { email, password } = req.body;
    if (!email || !password || typeof (email) !== 'string') {
        next(new ValidationError("Email and password required for registering"));
    }
    const user = await Users.findOne({
        email
    });
    if (user) {
        next(new ValidationError("Email already registered"));
        return;
    }
    let hashedPwd = bcrypt.hashSync(password, JWT_SALT_ROUNDS);
    let newUser = new Users({
        email,
        password: hashedPwd
    });
    newUser = await newUser.save()
        .catch(err => {
            console.log(err.stack);
            next(new DatabaseError("Error while registering user"));
        });
    const payload = {
        email: newUser.email
    };
    const token = jwt.sign(payload, JWT_SECRET_KEY, {
        expiresIn: JWT_EXPIRE_TIME
    })
    res.status(200).send({
        token,
        message: "Successful registration"
    });
}

async function LoginUser(req, res, next) {
    const { email, password } = req.body;
    if (!email || !password || typeof (email) !== 'string') {
        next(new ValidationError("Email and password are required for loging"));
    }
    const user = await Users.findOne({
        email
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
        expiresIn: JWT_EXPIRE_TIME
    })
    res.status(200).send({
        token,
        message: "Successful login"
    });
}

module.exports = { RegisterUser, LoginUser };