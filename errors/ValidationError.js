/**
 * Custom Error Class: ValidationError
 *
 * Represents an error that occurs when validation fails.
 * Inherits from the built-in Error class.
 */
class ValidationError extends Error {
    constructor(message) {
        super(message);
        this.statusCode = 404;
        this.name = "ValidationError"
    }
}

module.exports = ValidationError