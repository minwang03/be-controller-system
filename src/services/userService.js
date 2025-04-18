const { pool } = require('../config/db');  
const addUser = async (userData) => {
  const { name, email, password, phone, address, role } = userData;
  try {
    const [results] = await pool.query(
      'INSERT INTO users (name, email, password, phone, address, role, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW())',
      [name, email, password, phone, address, role]
    );
    return results;
  } catch (error) {
    throw new Error('Không thể thêm người dùng: ' + error.message);
  }
};

const getUserByEmailAndPassword = async (email, password) => {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM users WHERE email = ? AND password = ?',
      [email, password]
    );
    return rows[0]; // Lấy user đầu tiên nếu có
  } catch (error) {
    throw new Error('Không thể tìm người dùng: ' + error.message);
  }
};

// Lấy danh sách tất cả người dùng
const getAllUsers = async () => {
  try {
    const [rows] = await pool.query('SELECT * FROM users');
    return rows;
  } catch (error) {
    throw new Error('Không thể lấy danh sách người dùng: ' + error.message);
  }
};

module.exports = { addUser,getUserByEmailAndPassword, getAllUsers };
