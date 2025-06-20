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
    res.status(200).json({ message: 'Đăng nhập thành công!', data: user });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server', error: error.message });
  }
};

// Lấy danh sách tất cả người dùng
const getAllUsersController = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json({ message: 'Lấy danh sách người dùng thành công!', data: users });
  } catch (error) {
    console.error('Lỗi khi lấy danh sách người dùng:', error);
    res.status(500).json({ message: 'Lỗi server', error: error.message });
  }
};

const loginWithGoogleController = async (req, res) => {
  const { email, name } = req.body;

  if (!email || !name) {
    return res.status(400).json({ message: 'Thiếu email hoặc name từ Google' });
  }

  try {
    let user = await userService.getUserByEmail(email);

    if (!user) {
      const newUser = {
        name,
        email,
        password: '',      
        phone: '',
        address: '',
        role: 'user',      
      };
      await userService.addUser(newUser);
      user = await userService.getUserByEmail(email); 
    }

    return res.status(200).json({ message: 'Đăng nhập Google thành công!', data: user });
  } catch (error) {
    console.error('Lỗi Google login:', error);
    res.status(500).json({ message: 'Lỗi server', error: error.message });
  }
};


module.exports = { addUserController,loginUserController, getAllUsersController, loginWithGoogleController};
