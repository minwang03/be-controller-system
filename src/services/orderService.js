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

module.exports = { createOrder };
