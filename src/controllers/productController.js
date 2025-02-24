const { getAllProducts,getProductById } = require('../services/productService');

const getProducts = async (req, res) => {
  try {
    const fruits = await getAllProducts();
    res.json({ success: true, data: fruits });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getProductId = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await getProductById(id);
    if (!product) {
      return res.status(404).json({ success: false, message: "Không tìm thấy sản phẩm." });
    }
    res.json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getProducts,getProductId };
