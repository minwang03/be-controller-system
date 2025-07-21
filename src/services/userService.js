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

const getUserByEmail = async (email) => {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );
    return rows[0];
  } catch (error) {
    throw new Error('Không thể tìm người dùng bằng email: ' + error.message);
  }
};

const deleteUser = async (userId) => {
  try {
    const [result] = await pool.query(
      'DELETE FROM users WHERE user_id = ?',
      [userId]
    );
    return result;
  } catch (error) {
    throw new Error('Không thể xoá người dùng: ' + error.message);
  }
};

const updatePassword = async (email, newPassword) => {
  try {
    const [result] = await pool.query(
      'UPDATE users SET password = ?, updated_at = NOW() WHERE email = ?',
      [newPassword, email]
    );
    return result;
  } catch (error) {
    throw new Error('Không thể cập nhật mật khẩu: ' + error.message);
  }
};

module.exports = { addUser,getUserByEmailAndPassword, getAllUsers, getUserByEmail, deleteUser, updatePassword,};
