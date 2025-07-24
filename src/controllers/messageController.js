const messageService = require('../services/messageService');

// Lấy tin nhắn giữa 2 người (chat riêng)
const getPrivateMessages = async (req, res) => {
  const { user1, user2 } = req.params;
  const room = [Number(user1), Number(user2)].sort((a, b) => a - b).join('_');

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
    const user = await messageService.getUserById(sender_id); 

    const fullMessage = {
      sender_id,
      room,
      message,
      name: user.name,
      avatar: user.avatar || null,
      created_at: new Date().toISOString()
    };

    await messageService.saveMessage(fullMessage);

    res.status(200).json({ message: 'Đã gửi', data: fullMessage });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server', error: error.message });
  }
};

module.exports = { getPrivateMessages, sendMessage };
