const { pool } = require('../config/db');

const getAllProducts = async () => {
  try {
    const [results] = await pool.query("SELECT * FROM products");
    return results;
  } catch (error) {
    throw new Error('Không thể lấy danh sách sản phẩm: ' + error.message);
  }
};

const getProductById = async (id) => {
  try {
    const [results] = await pool.query("SELECT * FROM products WHERE product_id = ?", [id]);
    if (results.length === 0) {
      return null;
    }
    return results[0];
  } catch (error) {
    throw new Error('Không thể lấy sản phẩm: ' + error.message);
  }
};

const searchProducts = async (query) => {
  const [results] = await pool.query(
    "SELECT * FROM products WHERE name LIKE ?",
    [`%${query}%`]
  );
  return results;
};

module.exports = { getAllProducts, getProductById, searchProducts };
