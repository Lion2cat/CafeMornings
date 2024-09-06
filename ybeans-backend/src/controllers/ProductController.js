const Product = require('../models/ProductModel');

exports.createProduct = async (req, res) => {
  try {
    const { name, description, price, stock, imageUrl } = req.body;
    const product = await Product.create({ name, description, price, stock, imageUrl });
    res.status(201).json({ message: 'Product created successfully', product });
  } catch (error) {
    res.status(400).json({ message: 'Product creation failed', error: error.message });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products', error: error.message });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching product', error: error.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const [updated] = await Product.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated) {
      const updatedProduct = await Product.findByPk(req.params.id);
      return res.json({ message: 'Product updated successfully', product: updatedProduct });
    }
    throw new Error('Product not found');
  } catch (error) {
    res.status(400).json({ message: 'Product update failed', error: error.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const deleted = await Product.destroy({
      where: { id: req.params.id }
    });
    if (deleted) {
      return res.json({ message: 'Product deleted successfully' });
    }
    throw new Error('Product not found');
  } catch (error) {
    res.status(400).json({ message: 'Product deletion failed', error: error.message });
  }
};
