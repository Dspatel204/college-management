const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/login', (req, res) => {
  res.status(405).json({
    message: 'Use POST /api/auth/login with JSON { email, password }',
    method: 'POST',
    path: '/api/auth/login',
    demo: {
      admin: { email: 'admin@college.com', password: 'admin123' },
    },
  });
});

router.post('/register', authController.register);
router.post('/login', authController.login);

router.get('/me', authMiddleware, authController.me);
router.put('/me', authMiddleware, authController.updateMe);

module.exports = router;
