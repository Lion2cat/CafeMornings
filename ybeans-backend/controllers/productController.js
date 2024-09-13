const Product = require('../models/Product');

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = async (req, res) => {
  try {
    const { name, description, price, stock, category, origin, roastLevel, flavorNotes } = req.body;
    const imageUrl = req.file ? `/images/products/${req.file.filename}` : null;

    const product = new Product({
      name,
      description,
      price,
      stock,
      category,
      origin,
      roastLevel,
      flavorNotes: flavorNotes ? flavorNotes.split(',').map(note => note.trim()) : [],
      imageUrl
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(400).json({ message: 'Invalid product data', error: error.message });
  }
};

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, description, price, stock, category, origin, roastLevel, flavorNotes, imageUrl } = req.body;

  try {
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    product.name = name || product.name;
    product.description = description || product.description;
    product.price = price || product.price;
    product.stock = stock || product.stock;
    product.category = category || product.category;
    product.origin = origin || product.origin;
    product.roastLevel = roastLevel || product.roastLevel;
    product.flavorNotes = Array.isArray(flavorNotes) ? flavorNotes : (flavorNotes ? flavorNotes.split(',').map(note => note.trim()) : product.flavorNotes);
    product.imageUrl = imageUrl || product.imageUrl;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(400).json({ message: 'Invalid product data', error: error.message });
  }
};

// Delete a product
const deleteProduct = async (req, res) => {
  try {
    console.log('Attempting to delete product with id:', req.params.id);
    const product = await Product.findById(req.params.id);

    if (product) {
      await Product.deleteOne({ _id: req.params.id });
      console.log('Product deleted successfully');
      res.json({ message: 'Product removed' });
    } else {
      console.log('Product not found');
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { getProducts, getProductById, createProduct, updateProduct, deleteProduct };