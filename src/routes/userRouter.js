const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

// Thêm người dùng 
router.post('/users', userController.addUserController);

// Đăng nhập người dùng
router.post('/users/login', userController.loginUserController);

router.get('/users', userController.getAllUsersController);

// Đăng nhập bằng google
router.post('/users/login-google', userController.loginWithGoogleController);

router.delete('/users/:id', userController.deleteUserController);

module.exports = router;
