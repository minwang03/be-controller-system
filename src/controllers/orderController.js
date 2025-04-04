const { createOrder, getOrdersByUserId, getOrderDetailsByOrderId, getAllOrdersSorted } = require("../services/orderService");

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
    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getOrderDetailsController = async (req, res) => {
  try {
    const { orderId } = req.params;
    const orderDetails = await getOrderDetailsByOrderId(orderId);

    res.status(200).json({
      success: true,
      data: orderDetails,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getAllOrdersSortedController = async (req, res) => {
  try {
    const orders = await getAllOrdersSorted();
    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { createOrderController, getOrdersController, getOrderDetailsController, getAllOrdersSortedController};
