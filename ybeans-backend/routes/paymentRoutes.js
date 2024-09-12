const express = require('express');
const router = express.Router();
const { createPayment, handlePaymentNotification } = require('../controllers/paymentController');
const { protect } = require('../middleware/authMiddleware');

router.post('/create', protect, createPayment);
router.post('/webhook', handlePaymentNotification);

module.exports = router;
