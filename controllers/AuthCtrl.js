const { hashPwd, generateJwt, comparePwds } = require('../utilities/Security');
const Users = require('../model/User');
const ValidationError = require('../errors/ValidationError');
const AuthenticationError = require('../errors/AuthenticationError');
const DatabaseError = require('../errors/DatabaseError');
const { userSchema } = require('../utilities/Joi');

async function RegisterUser(req, res, next) {
    const { email, password } = req.body;
    const { error } = userSchema.validate({
        email,
        password
    });
    if (error) {
        next(new ValidationError("Email and/or password have an invalid format"));
        return;
    }
    const user = await Users.findOne({
        email
    });
    if (user) {
        next(new ValidationError("Email already registered"));
        return;
    }
    const hashedPwd = await hashPwd(password)
        .catch(err => {
            console.log(err.stack);
            next(new ValidationError("Error while processing password"));
            return;
        });
    let newUser = new Users({
        email,
        password: hashedPwd
    });
    newUser = await newUser.save()
        .catch(_ => {
            next(new DatabaseError("Error while registering user"));
            return;
        });
    const payload = {
        email: newUser.email
    };
    const token = generateJwt(payload);
    res.status(200).send({
        token,
        message: "Successful registration"
    });
}

async function LoginUser(req, res, next) {
    const { email, password } = req.body;
    const { error } = userSchema.validate({
        email,
        password
    });
    if (error) {
        next(new ValidationError("Email and/or password have an invalid format"));
        return;
    }
    const user = await Users.findOne({
        email
    });
    if (!user) {
        next(new AuthenticationError("User not found"));
        return;
    }
    const validPwd = await comparePwds(password, user.password)
        .catch(_ => {
            next(new AuthenticationError("Error while validating password"));
            return;
        });
    if (!validPwd) {
        next(new AuthenticationError("Incorrect password"));
        return;
    }
    const payload = {
        email: user.email
    };
    const token = generateJwt(payload);
    res.status(200).send({
        token,
        message: "Successful login"
    });
}

module.exports = { RegisterUser, LoginUser };