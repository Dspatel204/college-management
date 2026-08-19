const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const requireRole = require('../middleware/roleMiddleware');
const paymentController = require('../controllers/paymentController');

// Create Razorpay order — students can pay their own fees, admin can create for anyone
router.post('/create-order', authMiddleware, paymentController.createOrder);

// Verify payment after Razorpay checkout completes
router.post('/verify', authMiddleware, paymentController.verifyPayment);

// View payment history — admin only
router.get('/history', authMiddleware, requireRole('admin'), paymentController.paymentHistory);

module.exports = router;
