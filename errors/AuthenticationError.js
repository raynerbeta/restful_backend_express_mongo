/**
 * Custom Error Class: AuthenticationError
 *
 * Represents an error that occurs when authentication fails.
 * Inherits from the built-in Error class.
 */
class AuthenticationError extends Error {
    constructor(message) {
        super(message);
        this.statusCode = 401;
        this.name = "Authentication error";
    }
}

module.exports = AuthenticationError