const mongoose = require("mongoose");

const voucherSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true, // Đảm bảo mã voucher là duy nhất
    trim: true, // Loại bỏ khoảng trắng không cần thiết
  },
  discountAmount: {
    type: Number,
    required: true, // Số tiền giảm giá hoặc tỷ lệ giảm giá
  },
  validFrom: {
    type: Date,
    required: true, // Ngày bắt đầu có hiệu lực
  },
  validTo: {
    type: Date,
    required: true, // Ngày hết hạn có hiệu lực
  },
  minPurchaseAmount: {
    type: Number,
    default: 0, // Số tiền tối thiểu để sử dụng voucher
  },
  maxDiscountAmount: {
    type: Number,
    default: 0, // Giới hạn số tiền giảm tối đa
  },
  usageLimit: {
    type: Number,
    default: 1, // Giới hạn số lần sử dụng voucher
  },
  timesUsed: {
    type: Number,
    default: 0, // Số lần đã sử dụng voucher
  },
  applicableProducts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product", // Danh sách sản phẩm mà voucher có thể áp dụng
    },
  ],
  applicableCategories: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category", // Danh sách danh mục sản phẩm mà voucher có thể áp dụng
    },
  ],
  isActive: {
    type: Boolean,
    default: true, // Trạng thái của voucher (còn hoạt động hay không)
  },
  createdAt: {
    type: Date,
    default: Date.now, // Ngày tạo voucher
  },
});

const Voucher = mongoose.model("Voucher", voucherSchema);
module.exports = Voucher;
