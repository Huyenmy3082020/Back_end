const express = require("express");
const router = express.Router();
const OrderController = require("../controller/OrderController");

router.post("/createOrder", OrderController.createOrder);

module.exports = router;
