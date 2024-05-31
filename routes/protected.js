const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');
const { defaultFunction } = require('../controllers/ProtectedCtrl');
const { uploadImage } = require('../utilities/Multer');

// Middleware for every request in this route
router.use(authenticateToken);
router.post('/default', uploadImage.single('image'), defaultFunction);

module.exports = router;