const { pool } = require('../config/db');

const getAllProducts = async () => {
  try {
    const [results] = await pool.query("SELECT * FROM products");
    return results;
  } catch (error) {
    throw new Error('Không thể lấy danh sách sản phẩm: ' + error.message);
  }
};

module.exports = { getAllProducts };
