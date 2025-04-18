require('dotenv').config();
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root1',
  password: process.env.DB_PASSWORD || 'root1',
  database: process.env.DB_NAME || 'QuangDB',
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  charset: 'utf8mb4', 
});

const connectDB = async () => {
  try {
    await pool.getConnection(); 
    console.log('Kết nối cơ sở dữ liệu thành công!');
  } catch (error) {
    console.error('Không thể kết nối tới cơ sở dữ liệu:', error.message);
    process.exit(1); 
  }
};

module.exports = { pool, connectDB };
