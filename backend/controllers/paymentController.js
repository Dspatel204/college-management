const crypto = require('crypto');
const razorpay = require('../config/razorpay');
const { Fee } = require('../models');

// POST /api/payments/create-order
// Creates a Razorpay order for a pending fee
const createOrder = async (req, res) => {
  try {
    const { feeId } = req.body;
    if (!feeId) return res.status(400).json({ message: 'feeId is required' });

    const fee = await Fee.findByPk(feeId);
    if (!fee) return res.status(404).json({ message: 'Fee record not found' });

    if (fee.status === 'paid') {
      return res.status(400).json({ message: 'This fee is already paid' });
    }

    // Amount in paise (Razorpay uses smallest currency unit)
    const amountDue = parseFloat(fee.amount) - parseFloat(fee.paid || 0);
    const amountInPaise = Math.round(amountDue * 100);

    const order = await razorpay.orders.create({
      amount: amountInPaise,
      currency: 'INR',
      receipt: `fee_${feeId.substring(0, 8)}_${Date.now()}`,
      notes: {
        feeId,
        studentId: fee.studentId,
        feeType: fee.type,
      },
    });

    // Store order ID in fee record
    await fee.update({ razorpayOrderId: order.id });

    res.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId: process.env.RAZORPAY_KEY_ID,
      feeId,
    });
  } catch (err) {
    console.error('Razorpay order error:', err);
    res.status(500).json({ message: err.message });
  }
};

// POST /api/payments/verify
// Verifies Razorpay HMAC signature and marks fee as paid
const verifyPayment = async (req, res) => {
  try {
    const { razorpayOrderId, razorpayPaymentId, razorpaySignature, feeId } = req.body;

    if (!razorpayOrderId || !razorpayPaymentId || !razorpaySignature || !feeId) {
      return res.status(400).json({ message: 'Missing payment verification fields' });
    }

    // HMAC-SHA256 signature verification
    const body = `${razorpayOrderId}|${razorpayPaymentId}`;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest('hex');

    if (expectedSignature !== razorpaySignature) {
      return res.status(400).json({ message: 'Payment verification failed — invalid signature' });
    }

    // Mark fee as paid
    const fee = await Fee.findByPk(feeId);
    if (!fee) return res.status(404).json({ message: 'Fee not found' });

    const receiptNo = `RCP-${Date.now()}`;
    await fee.update({
      paid: fee.amount,
      status: 'paid',
      paidDate: new Date().toISOString().split('T')[0],
      receiptNo,
      razorpayPaymentId,
    });

    res.json({
      success: true,
      message: 'Payment verified and recorded',
      receiptNo,
      fee,
    });
  } catch (err) {
    console.error('Payment verification error:', err);
    res.status(500).json({ message: err.message });
  }
};

// GET /api/payments/history  (admin view)
const paymentHistory = async (req, res) => {
  try {
    const fees = await Fee.findAll({
      where: { status: 'paid' },
      order: [['updatedAt', 'DESC']],
    });
    res.json(fees);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { createOrder, verifyPayment, paymentHistory };
