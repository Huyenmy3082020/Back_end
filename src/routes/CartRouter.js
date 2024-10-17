const express = require("express");
const router = express.Router();
const CartController = require("../controller/CartController");
const {
  authMiddleware,
  authUserMiddleware,
} = require("../middleware/authmiddleware");
router.post("/createCart", CartController.createCart);
router.get("/getCartByUser/:id", CartController.getCartByUser);
router.put("/alterAmount", CartController.alterAmount);
router.delete("/delete", CartController.deleteAllCard);

module.exports = router;
