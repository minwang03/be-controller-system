const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');

// Lấy tin nhắn giữa 2 người
router.get('/messages/private/:user1/:user2', messageController.getPrivateMessages);

// (Tùy chọn) Gửi tin nhắn qua HTTP (nếu muốn)
router.post('/messages', messageController.sendMessage);

module.exports = router;
