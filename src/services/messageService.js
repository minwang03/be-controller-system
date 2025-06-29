const { pool } = require('../config/db');

// Lưu tin nhắn vào DB
const saveMessage = async ({ sender_id, room, message }) => {
  const [result] = await pool.query(
    'INSERT INTO messages (sender_id, room, message, created_at) VALUES (?, ?, ?, NOW())',
    [sender_id, room, message]
  );
  return result;
};

// Lấy tất cả tin nhắn theo room
const getMessagesByRoom = async (room) => {
  const [rows] = await pool.query(
    `SELECT m.*, u.name, u.avatar FROM messages m 
     JOIN users u ON m.sender_id = u.user_id 
     WHERE room = ? ORDER BY created_at ASC`,
    [room]
  );
  return rows;
};

module.exports = { saveMessage, getMessagesByRoom };
