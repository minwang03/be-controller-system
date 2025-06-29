const messageService = require('../services/messageService');

// Lấy tin nhắn giữa 2 người (chat riêng)
const getPrivateMessages = async (req, res) => {
  const { user1, user2 } = req.params;
  const room = [user1, user2].sort().join('_');

  try {
    const messages = await messageService.getMessagesByRoom(room);
    res.status(200).json({ data: messages });
  } catch (error) {
    console.error('Lỗi khi lấy tin nhắn:', error);
    res.status(500).json({ message: 'Lỗi server', error: error.message });
  }
};

// (Tùy chọn) Gửi tin nhắn qua API (không cần nếu dùng socket)
const sendMessage = async (req, res) => {
  const { sender_id, room, message } = req.body;

  if (!sender_id || !room || !message) {
    return res.status(400).json({ message: 'Thiếu dữ liệu' });
  }

  try {
    const result = await messageService.saveMessage({ sender_id, room, message });
    res.status(200).json({ message: 'Đã gửi', data: result });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server', error: error.message });
  }
};

module.exports = { getPrivateMessages, sendMessage };
