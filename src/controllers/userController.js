const userService = require('../services/userService');

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

module.exports = { addUserController };
