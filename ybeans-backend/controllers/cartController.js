const Cart = require('../models/Cart');
const Product = require('../models/Product');

// @desc    获取用户的购物车
// @route   GET /api/cart
// @access  Private
const getCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user._id }).populate({
      path: 'items.product',
      select: 'name price imageUrl'
    });
    if (!cart) {
      cart = new Cart({ user: req.user._id, items: [] });
      await cart.save();
    }

    // 过滤掉无效的商品
    cart.items = cart.items.filter(item => item.product != null);
    await cart.save();

    res.json(cart);
  } catch (error) {
    console.error('Error in getCart:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    添加商品到购物车
// @route   POST /api/cart/add
// @access  Private
const addToCart = async (req, res) => {
  const { productId, quantity } = req.body;

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    let cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      cart = new Cart({ user: req.user._id, items: [] });
    }

    const cartItemIndex = cart.items.findIndex(item => item.product.toString() === productId);

    if (cartItemIndex > -1) {
      cart.items[cartItemIndex].quantity += quantity;
    } else {
      cart.items.push({ product: productId, quantity });
    }

    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    更新购物车中的商品数量
// @route   PUT /api/cart/update/:id
// @access  Private
const updateCartItem = async (req, res) => {
  const { quantity } = req.body;

  try {
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const cartItem = cart.items.id(req.params.id);
    if (!cartItem) {
      return res.status(404).json({ message: 'Item not found in cart' });
    }

    cartItem.quantity = quantity;
    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    从购物车中移除商品
// @route   DELETE /api/cart/remove/:id
// @access  Private
const removeFromCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    cart.items = cart.items.filter(item => item._id.toString() !== req.params.id);
    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getCart, addToCart, updateCartItem, removeFromCart };
