/**
 * Custom Error Class: DatabaseError
 *
 * Represents an error that occurs when database connection fails.
 * Inherits from the built-in Error class.
 */
class DatabaseError extends Error {
    constructor(message) {
        super(message);
        this.statusCode = 503;
        this.name = "Database error";
    }
}

module.exports = DatabaseError