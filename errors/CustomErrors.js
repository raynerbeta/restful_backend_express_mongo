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

/**
 * Custom Error Class: InvalidUserError
 *
 * Represents an error that occurs when dealing with an invalid user.
 * Inherits from the built-in Error class.
 */
class InvalidUserError extends Error {
    constructor(message) {
        super(message);
        this.statusCode = 400;
        this.name = "InvalidUserError";
    }
}

/**
 * Custom Error Class: AuthenticationFailed
 *
 * Represents an error that occurs when authentication fails.
 * Inherits from the built-in Error class.
 */
class AuthenticationFailed extends Error {
    constructor(message) {
        super(message);
        this.statusCode = 401;
        this.name = "AuthenticationFailed";
    }
}

/**
 * Custom Error Class: DatabaseError
 *
 * Represents an error that occurs when database connection fails.
 * Inherits from the built-in Error class.
 */
class DatabaseError extends Error {
    constructor(message) {
        super(message);
        this.statusCode = 401;
        this.name = "DatabaseError";
    }
}

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
        this.name = "RateLimitingError";
    }
}

module.exports = { ValidationError, InvalidUserError, AuthenticationFailed, DatabaseError, RateLimitingError }