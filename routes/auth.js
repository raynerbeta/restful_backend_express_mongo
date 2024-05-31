const express = require('express');
const rateLimit = require('express-rate-limit');
const { RegisterUser, LoginUser } = require('../controllers/AuthCtrl');
const RateLimitError=require('../errors/RateLimitError');

const router = express.Router();
router.post('/register', rateLimit({
    validate: {
        xForwardedForHeader: false,
		default: true
	},
    windowMs: 1 * 60 * 60 * 1000, // 1 hour
    max: 1, // Maximum 1 request per 1 hour
    handler: ()=>{
        throw new RateLimitError('Too many requests');
    }
}),
RegisterUser);
router.post('/login', rateLimit({
    validate: {
        xForwardedForHeader: false,
		default: true
	},
    windowMs: 5 * 60 * 1000, // 5 minutes
    max: 3, // Maximum 3 requests per 5 minutes
    handler: ()=>{
        throw new RateLimitError('Too many requests');
    }
}),
LoginUser);

module.exports = router;