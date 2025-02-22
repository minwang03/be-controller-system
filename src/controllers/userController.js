const userService = require('../services/userService');

// Thêm người dùng
const addUserController = async (req, res) => {
  const userData = req.body;
  try {
    const result = await userService.addUser(userData);
    res.status(200).json({ message: 'Thêm người dùng thành công!', data: result });
  } catch (error) {
    console.error('Lỗi khi thêm người dùng:', error);
    res.status(500).json({ message: 'Lỗi server', error: error.message });
  }
};

// Đăng nhập người dùng
const loginUserController = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userService.getUserByEmailAndPassword(email, password);
    if (!user) {
      return res.status(401).json({ message: 'Email hoặc mật khẩu không đúng' });
    }
    res.status(200).json({ message: 'Đăng nhập thành công!', user });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server', error: error.message });
  }
};

module.exports = { addUserController,loginUserController };
