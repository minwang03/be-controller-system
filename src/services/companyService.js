const { pool } = require('../config/db');

const getAllCompany = async () => {
  try {
    const result = await pool.query('SELECT * FROM company');
    return result.rows; 
  } catch (error) {
    throw new Error('Lỗi khi lấy dữ liệu đối tác');
  }
};

module.exports = { getAllCompany };