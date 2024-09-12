const Cart = require('../models/Cart');

// @desc    Get user cart
// @route   GET /api/cart
// @access  Private
const getCart = async (req, res) => {
  const cart = await Cart.findOne({ user: req.user._id }).populate('items.product');
  if (cart) {
    res.json(cart);
  } else {
    res.json({ items: [] });
  }
};

// @desc    Add item to cart
// @route   POST /api/cart
// @access  Private
const addToCart = async (req, res) => {
  const { productId, quantity } = req.body;

  let cart = await Cart.findOne({ user: req.user._id });

  if (!cart) {
    cart = new Cart({ user: req.user._id, items: [] });
  }

  const existItem = cart.items.find(x => x.product.toString() === productId);

  if (existItem) {
    existItem.quantity += quantity;
  } else {
    cart.items.push({ product: productId, quantity });
  }

  const updatedCart = await cart.save();
  res.status(201).json(updatedCart);
};

// @desc    Update cart item quantity
// @route   PUT /api/cart/:id
// @access  Private
const updateCartItem = async (req, res) => {
  const { quantity } = req.body;

  const cart = await Cart.findOne({ user: req.user._id });

  if (cart) {
    const existItem = cart.items.find(x => x.product.toString() === req.params.id);
    if (existItem) {
      existItem.quantity = quantity;
      const updatedCart = await cart.save();
      res.json(updatedCart);
    }
  } else {
    res.status(404);
    throw new Error('Cart not found');
  }
};

module.exports = { getCart, addToCart, updateCartItem };
