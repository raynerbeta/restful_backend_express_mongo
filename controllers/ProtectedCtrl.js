const ValidationError = require('../errors/ValidationError');

function defaultFunction(req, res, next) {
    if (!req.file) {
        next(new ValidationError('No image uploaded'));
    }
    res.status(201).send({ message: "Uploaded image as: " + req.file.filename });
}

module.exports = { defaultFunction };