require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'postgres',
  password: process.env.DB_PASSWORD || 'your_password', // Kiểm tra biến này
  port: process.env.DB_PORT || 5432,
});

const connectDB = async () => {
    try {
      const client = await pool.connect();
      console.log('Kết nối cơ sở dữ liệu thành công!');
      client.release();
    } catch (error) {
      console.error('Không thể kết nối tới cơ sở dữ liệu:', error);
      process.exit(1);
    }
  };

  module.exports = { pool, connectDB };
