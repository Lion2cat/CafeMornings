const Review = require('../models/Review');
const Product = require('../models/Product');

// @desc    Create new review
// @route   POST /api/reviews
// @access  Private
const createReview = async (req, res) => {
  const { rating, comment, productId } = req.body;

  const review = new Review({
    user: req.user._id,
    product: productId,
    rating,
    comment,
  });

  const createdReview = await review.save();

  // Update product rating
  const product = await Product.findById(productId);
  const allReviews = await Review.find({ product: productId });
  
  product.rating = allReviews.reduce((acc, item) => item.rating + acc, 0) / allReviews.length;
  product.numReviews = allReviews.length;

  await product.save();

  res.status(201).json(createdReview);
};

// @desc    Get reviews for a product
// @route   GET /api/reviews/product/:productId
// @access  Public
const getProductReviews = async (req, res) => {
  const reviews = await Review.find({ product: req.params.productId })
    .populate('user', 'name')
    .sort('-createdAt');

  res.json(reviews);
};

module.exports = { createReview, getProductReviews };
