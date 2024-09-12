const { createWechatPayment, createAlipayPayment } = require('../services/paymentService');
const Order = require('../models/Order');

// @desc    Create payment for an order
// @route   POST /api/payment/create
// @access  Private
const createPayment = async (req, res) => {
  const { orderId, paymentMethod } = req.body;

  const order = await Order.findById(orderId);

  if (!order) {
    res.status(404);
    throw new Error('Order not found');
  }

  let paymentResult;

  try {
    if (paymentMethod === 'wechat') {
      paymentResult = await createWechatPayment(orderId, order.totalPrice);
    } else if (paymentMethod === 'alipay') {
      paymentResult = await createAlipayPayment(orderId, order.totalPrice);
    } else {
      res.status(400);
      throw new Error('Invalid payment method');
    }

    res.json(paymentResult);
  } catch (error) {
    res.status(500);
    throw new Error('Payment creation failed');
  }
};

// @desc    Handle payment notification (webhook)
// @route   POST /api/payment/webhook
// @access  Public
const handlePaymentNotification = async (req, res) => {
  // 这里应该根据支付提供商的通知格式来处理
  // 验证通知的真实性，更新订单状态等
  const { orderId, paymentStatus, paymentMethod } = req.body;

  try {
    const order = await Order.findById(orderId);

    if (!order) {
      res.status(404);
      throw new Error('Order not found');
    }

    if (paymentStatus === 'success') {
      order.isPaid = true;
      order.paidAt = Date.now();
      order.paymentResult = {
        id: req.body.transactionId,
        status: 'completed',
        update_time: Date.now(),
        payment_method: paymentMethod,
      };

      await order.save();
    }

    res.status(200).send('OK');
  } catch (error) {
    console.error('Payment notification error:', error);
    res.status(500).send('Error processing payment notification');
  }
};

module.exports = { createPayment, handlePaymentNotification };
