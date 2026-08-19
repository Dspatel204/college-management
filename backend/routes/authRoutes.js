const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

// Public
router.post('/register', authController.register);
router.post('/login', authController.login);

// Protected
router.get('/me', authMiddleware, authController.me);
router.put('/me', authMiddleware, authController.updateMe);

module.exports = router;
