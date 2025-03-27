const { pool } = require("../config/db");

// Tạo đơn hàng mới và lưu chi tiết đơn hàng
const createOrder = async (userId, cartItems) => {
  if (!cartItems || cartItems.length === 0) {
    throw new Error("Giỏ hàng trống!");
  }

  try {
    const connection = await pool.getConnection();
    await connection.beginTransaction();

    const totalPrice = cartItems.reduce((sum, item) => sum + item.quantity * item.unit_price, 0);

    // Thêm đơn hàng vào bảng orders
    const [orderResult] = await connection.query(
      "INSERT INTO orders (user_id, total_price, status) VALUES (?, ?, 'pending')",
      [userId, totalPrice]
    );
    const orderId = orderResult.insertId;

    // Thêm từng sản phẩm vào bảng order_details
    for (const item of cartItems) {
      await connection.query(
        "INSERT INTO order_details (order_id, product_id, quantity, unit_price) VALUES (?, ?, ?, ?)",
        [orderId, item.product_id, item.quantity, item.unit_price]
      );
    }

    await connection.commit();
    connection.release();

    return { success: true, orderId, message: "Thanh toán thành công!" };
  } catch (error) {
    throw new Error("Lỗi khi tạo đơn hàng: " + error.message);
  }
};

const getOrdersByUserId = async (userId) => {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM orders WHERE user_id = ? ORDER BY order_date DESC',
      [userId]
    );
    return rows;
  } catch (error) {
    throw new Error('Không thể lấy đơn hàng: ' + error.message);
  }
};

const getOrderDetailsByOrderId = async (orderId) => {
  const [orderDetails] = await pool.query(
    `SELECT od.order_detail_id, od.order_id, 
            p.product_id, p.name AS product_name, 
            od.quantity, od.unit_price, od.subtotal
     FROM order_details od
     JOIN products p ON od.product_id = p.product_id
     WHERE od.order_id = ?`,
    [orderId]
  );
  return orderDetails;
};

module.exports = { createOrder, getOrdersByUserId, getOrderDetailsByOrderId };
