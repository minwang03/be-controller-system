const express = require("express");
const orderController  = require("../controllers/orderController");

const router = express.Router();

// Route thanh toán (tạo đơn hàng)
router.post("/orders", orderController.createOrderController);

// Route lấy danh sách đơn hàng theo user_id
router.get('/orders/:userId', orderController.getOrdersController);

module.exports = router;
