const { pool } = require('../config/db');

const getAllCategories = async () => {
  try {
    const [results] = await pool.query("SELECT * FROM categories"); 
    return results;
  } catch (error) {
    throw new Error('Không thể lấy danh mục sản phẩm: ' + error.message);
  }
};

module.exports = { getAllCategories };
