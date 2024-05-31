/**
 * Custom Error Class: RateLimitError
 *
 * Represents an error that occurs when rate limit is exceeded.
 * Inherits from the built-in Error class.
 */
class RateLimitError extends Error {
    constructor(message) {
        super(message);
        this.statusCode = 429;
        this.name = "RateLimit error";
    }
}

module.exports = RateLimitError