const express = require('express');
const router = express.Router();
const { getCart, addToCart, updateCartItem, removeFromCart } = require('../controllers/cartController');
const { protect } = require('../middleware/authMiddleware');

// 所有购物车路由都需要用户认证
router.use(protect);

// 获取用户的购物车
router.get('/', getCart);

// 添加商品到购物车
router.post('/add', addToCart);

// 更新购物车中的商品数量
router.put('/update/:id', updateCartItem);

// 从购物车中移除商品
router.delete('/remove/:id', removeFromCart);

module.exports = router;
