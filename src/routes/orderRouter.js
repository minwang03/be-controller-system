const express = require("express");
const orderController  = require("../controllers/orderController");

const router = express.Router();

// Route thanh toán (tạo đơn hàng)
router.post("/orders", orderController.createOrderController);

module.exports = router;
