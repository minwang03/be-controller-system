const express = require("express");
const orderController  = require("../controllers/orderController");

const router = express.Router();

// Route thanh toán (tạo đơn hàng)
router.post("/orders", orderController.createOrderController);

// Route lấy danh sách đơn hàng theo user_id
router.get('/orders/users/:userId', orderController.getOrdersController);

// Route lấy danh sách đơn hàng
router.get("/orders/all", orderController.getAllOrdersSortedController);

// Route lấy chi tiết hóa đơn theo order_id
router.get('/orders/detail/:orderId', orderController.getOrderDetailsController);

// Route cập nhật status theo order_id
router.put("/orders/:orderId/status", orderController.updateOrderStatusController);

module.exports = router;
