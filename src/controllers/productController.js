const { getAllProducts } = require('../services/productService');

const getProducts = async (req, res) => {
  try {
    const fruits = await getAllProducts();
    res.json({ success: true, data: fruits });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getProducts };
