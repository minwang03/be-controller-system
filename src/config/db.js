require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 5432,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl: {
        require: true,
        rejectUnauthorized: false,
    },
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
