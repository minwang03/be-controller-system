const { pool } = require("../config/db");
const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

const calculateTotalPrice = (cartItems) => {
  return cartItems.reduce((sum, item) => sum + item.quantity * item.unit_price, 0);
};

const insertOrder = async (connection, userId, totalPrice) => {
  const [orderResult] = await connection.query(
    "INSERT INTO orders (user_id, total_price, status) VALUES (?, ?, 'pending')",
    [userId, totalPrice]
  );
  return orderResult.insertId;
};

const insertOrderDetails = async (connection, orderId, cartItems) => {
  for (const item of cartItems) {
    await connection.query(
      "INSERT INTO order_details (order_id, product_id, quantity, unit_price) VALUES (?, ?, ?, ?)",
      [orderId, item.product_id, item.quantity, item.unit_price]
    );
  }
};

const createPaymentIntent = async (totalPrice) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalPrice,
      currency: 'vnd',
      automatic_payment_methods: { enabled: true },
    });

    return {
      clientSecret: paymentIntent.client_secret,
      amount: totalPrice,
      message: "Đã tạo PaymentIntent thành công",
    };
  } catch (error) {
    throw new Error("Stripe error: " + error.message);
  }
};

const createOrder = async (userId, cartItems) => {
  if (!cartItems || cartItems.length === 0) {
    throw new Error("Giỏ hàng trống!");
  }

  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    const totalPrice = calculateTotalPrice(cartItems);
    const orderId = await insertOrder(connection, userId, totalPrice);
    await insertOrderDetails(connection, orderId, cartItems);

    const paymentIntentResult = await createPaymentIntent(totalPrice);

    await connection.commit();

    return {
      success: true,
      orderId,
      ...paymentIntentResult, 
    };
  } catch (error) {
    await connection.rollback();
    throw new Error("Lỗi khi tạo đơn hàng hoặc thanh toán: " + error.message);
  } finally {
    connection.release();
  }
};

const getOrdersByUserId = async (userId) => {
  try {
    // Lấy tất cả đơn hàng theo user_id
    const [orders] = await pool.query(
      'SELECT * FROM orders WHERE user_id = ? ORDER BY order_date DESC',
      [userId]
    );

    // Lặp qua từng đơn hàng để lấy chi tiết
    for (const order of orders) {
      const [details] = await pool.query(
        `SELECT od.order_detail_id, od.order_id,
                p.product_id, p.name AS product_name, p.image,
                od.quantity, od.unit_price, od.subtotal
         FROM order_details od
         JOIN products p ON od.product_id = p.product_id
         WHERE od.order_id = ?`,
        [order.order_id]
      );

      // Gắn chi tiết vào đơn hàng
      order.items = details;
    }

    return orders;
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

const getAllOrdersSorted = async () => {
  try {
    // 1. Lấy toàn bộ đơn hàng
    const [orders] = await pool.query(`
      SELECT o.*, u.name AS user_name, u.email
      FROM orders o
      JOIN users u ON o.user_id = u.user_id
    `);

    // 2. Lấy toàn bộ chi tiết đơn hàng và thông tin sản phẩm
    const [details] = await pool.query(`
      SELECT od.*, 
             p.name AS product_name, 
             p.image AS product_image,
             p.price AS product_price
      FROM order_details od
      JOIN products p ON od.product_id = p.product_id
    `);

    // 3. Gắn chi tiết sản phẩm vào từng đơn hàng
    for (const order of orders) {
      order.details = details.filter(d => d.order_id === order.order_id);
    }

    // 4. Sắp xếp: theo trạng thái → rồi thời gian tạo mới nhất
    const statusOrder = ['pending', 'processing', 'shipped', 'delivered', 'canceled'];
    orders.sort((a, b) => {
      const statusDiff = statusOrder.indexOf(a.status) - statusOrder.indexOf(b.status);
      if (statusDiff !== 0) return statusDiff;
      return new Date(b.order_date) - new Date(a.order_date);
    });

    return orders;
  } catch (error) {
    throw new Error("Không thể lấy danh sách đơn hàng: " + error.message);
  }
};

const updateOrderStatusById = async (orderId, status) => {
  const validStatuses = ['pending', 'processing', 'shipped', 'delivered', 'canceled'];
  if (!validStatuses.includes(status)) {
    throw new Error("Trạng thái không hợp lệ!");
  }

  try {
    const [result] = await pool.query(
      `UPDATE orders SET status = ? WHERE order_id = ?`,
      [status, orderId]
    );

    return result.affectedRows > 0; // Trả về true nếu update thành công
  } catch (error) {
    throw new Error("Không thể cập nhật trạng thái: " + error.message);
  }
};

module.exports = { createOrder, getOrdersByUserId, getOrderDetailsByOrderId, getAllOrdersSorted, updateOrderStatusById, createPaymentIntent};
