const joi = require('joi');

const userSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().alphanum().min(8).max(16).required()
});

module.exports = { userSchema };