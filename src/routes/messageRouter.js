const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');

router.get('/messages/private/:user1/:user2', messageController.getPrivateMessages);

module.exports = router;
