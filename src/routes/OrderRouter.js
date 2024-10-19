const express = require("express");
const router = express.Router();
const OrderController = require("../controller/OrderController");

router.post("/createOrder", OrderController.createOrder);
router.get("/getOrder", OrderController.getOrder);
router.delete("/deleteOrder/:id", OrderController.deleteOrder);
module.exports = router;
