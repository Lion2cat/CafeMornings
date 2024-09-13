const express = require('express');
const router = express.Router();
const {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  getOrders,
  updateOrderStatus
} = require('../controllers/orderController');
const { protect, admin } = require('../middleware/authMiddleware');

// 创建新订单
router.route('/').post(protect, addOrderItems);

// 获取所有订单（仅管理员）
router.route('/').get(protect, admin, getOrders);

// 获取特定订单
router.route('/:id').get(protect, getOrderById);

// 更新订单支付状态
router.route('/:id/pay').put(protect, updateOrderToPaid);

// 更新订单状态（仅管理员）
router.route('/:id/status').put(protect, admin, updateOrderStatus);

module.exports = router;
