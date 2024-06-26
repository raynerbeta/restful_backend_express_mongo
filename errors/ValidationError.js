/**
 * Custom Error Class: ValidationError
 *
 * Represents an error that occurs when validation fails.
 * Inherits from the built-in Error class.
 */
class ValidationError extends Error {
    constructor(message) {
        super(message);
        this.statusCode = 400;
        this.name = "Validation error"
    }
}

module.exports = ValidationError