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

module.exports = { addUser };
