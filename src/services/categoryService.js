const { pool } = require('../config/db');

// Get all categories
const getAllCategories = async () => {
  try {
    const [results] = await pool.query("SELECT * FROM categories"); 
    return results;
  } catch (error) {
    throw new Error('Không thể lấy danh mục sản phẩm: ' + error.message);
  }
};

// Create a new category
const createCategoryInDB = async ({ name, description }) => {
  try {
    const [result] = await pool.query(
      "INSERT INTO categories (name, description) VALUES (?, ?)", 
      [name, description]
    );
    return {
      category_id: result.insertId,
      name,
      description,
    };
  } catch (error) {
    throw new Error('Không thể tạo danh mục sản phẩm: ' + error.message);
  }
};

// Delete a category by ID
const deleteCategoryFromDB = async (category_id) => {
  try {
    const [result] = await pool.query(
      "DELETE FROM categories WHERE category_id = ?", 
      [category_id]
    );
    if (result.affectedRows === 0) {
      return null;  // No category was deleted
    }
    return { category_id };
  } catch (error) {
    throw new Error('Không thể xóa danh mục sản phẩm: ' + error.message);
  }
};

module.exports = { getAllCategories, createCategoryInDB, deleteCategoryFromDB };
