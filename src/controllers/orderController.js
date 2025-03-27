const { createOrder, getOrdersByUserId } = require("../services/orderService");

const createOrderController = async (req, res) => {
  try {
    const { user_id, cartItems } = req.body;
    if (!user_id || !cartItems) {
      return res.status(400).json({ success: false, message: "Thiếu dữ liệu đầu vào!" });
    }

    const result = await createOrder(user_id, cartItems);
    res.json(result);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getOrdersController = async (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    return res.status(400).json({ message: 'Thiếu userId' });
  }

  try {
    const orders = await getOrdersByUserId(userId);
    res.status(200).json({success: true, data: orders});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createOrderController, getOrdersController };
