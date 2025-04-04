const { getAllCategories, createCategoryInDB, deleteCategoryFromDB } = require('../services/categoryService');

const getCategory = async (req, res) => {
  try {
    const categories = await getAllCategories();
    res.json({ success: true, data: categories });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi lấy danh mục sản phẩm', error: error.message });
  }
};

// Create category
const createCategory = async (req, res) => {
  const { name, description } = req.body;

  if (!name) {
    return res.status(400).json({ message: 'Tên danh mục là bắt buộc.' });
  }

  try {
    const newCategory = await createCategoryInDB({ name, description });
    res.status(201).json({ success: true, data: newCategory });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi tạo danh mục sản phẩm', error: error.message });
  }
};

// Delete category
const deleteCategory = async (req, res) => {
  const { category_id } = req.params;

  if (!category_id) {
    return res.status(400).json({ message: 'ID danh mục không hợp lệ.' });
  }

  try {
    const deletedCategory = await deleteCategoryFromDB(category_id);
    if (deletedCategory) {
      res.json({ success: true, message: 'Danh mục đã bị xóa' });
    } else {
      res.status(404).json({ message: 'Danh mục không tìm thấy' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi xóa danh mục sản phẩm', error: error.message });
  }
};

module.exports = { getCategory, createCategory, deleteCategory };
