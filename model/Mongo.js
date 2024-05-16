const mongoose = require('mongoose');
const DatabaseError = require('../errors/DatabaseError');

class Mongo {
    constructor(host, port, user, password, db,) {
        this.host = host;
        this.port = port;
        this.user = user;
        this.password = password;
        this.db = db;
    }

    async Connect() {
        if (mongoose.connection.readyState === 0) {
            const MONGO_URI = `mongodb://${this.user}:${this.password}@${this.host}:${this.port}`;
            return mongoose.connect(MONGO_URI, { dbName: this.db });
        }
        return new Promise((_, reject) => {
            reject(new DatabaseError("Database already connected"));
        })
    }
}

module.exports = Mongo