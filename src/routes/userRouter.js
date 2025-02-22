const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

// Thêm người dùng 
router.post('/users', userController.addUserController);

// Đăng nhập người dùng
router.post('/users/login', userController.loginUserController);

module.exports = router;
