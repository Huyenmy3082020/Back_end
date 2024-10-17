const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  }, // ID của sản phẩm
  name: { type: String, required: true }, // Tên sản phẩm
  amount: { type: Number, required: true, min: 1 }, // Số lượng sản phẩm
  price: { type: Number, required: true }, // Giá sản phẩm
  image: { type: String, required: true }, // Hình ảnh sản phẩm
  discount: { type: Number, default: 0 }, // Giảm giá (nếu có)
});

const cartSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // ID của người dùng
  items: [cartItemSchema], // Danh sách các sản phẩm trong giỏ hàng
  totalPrice: { type: Number, default: 0 }, // Tổng giá trị của giỏ hàng
  createdAt: { type: Date, default: Date.now }, // Thời gian tạo giỏ hàng
  updatedAt: { type: Date, default: Date.now }, // Thời gian cập nhật giỏ hàng
});

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
