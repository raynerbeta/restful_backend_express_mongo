/**
 * Custom Error Class: RateLimitingError
 *
 * Represents an error that occurs when rate limiting is exceeded.
 * Inherits from the built-in Error class.
 */
class RateLimitingError extends Error {
    constructor(message) {
        super(message);
        this.statusCode = 429;
        this.name = "RateLimiting error";
    }
}

module.exports = RateLimitingError