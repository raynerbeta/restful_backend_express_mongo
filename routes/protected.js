const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');
const { defaultFunction } = require('../controllers/ProtectedCtrl');

// Middleware for every request in this route
router.use(authenticateToken);
router.use('/default', defaultFunction);

module.exports = router;