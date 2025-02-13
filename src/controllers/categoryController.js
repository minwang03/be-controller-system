const { getAllCategories } = require('../services/categoryService');

const getCategory = async (req, res) => {
  try {
    const categories = await getAllCategories();
    res.json({success: true, data: categories});
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi lấy danh mục sản phẩm', error: error.message });
  }
};

module.exports = { getCategory };
