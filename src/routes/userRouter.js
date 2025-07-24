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

router.put('/users/change-password', userController.changePasswordController);

router.get('/users/send-otp', userController.sendOtpController);

router.get('/users/verify-otp', userController.verifyOtpController);

module.exports = router;
