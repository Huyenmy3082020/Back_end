const mongoose = require("mongoose");
const mongoose_delete = require("mongoose-delete");
const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    countInStock: { type: Number, required: true },
    rating: { type: Number, required: true },
    discount: { type: Number, required: true },
    selled: { type: Number, required: true },
    type: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    description: { type: String, require: true },
  },
  {
    timestamps: true,
  }
);
productSchema.plugin(
  mongoose_delete,

  {
    deletedAt: true,
    overrideMethods: "all",
  }
);
const Product = mongoose.model("Product", productSchema);
module.exports = Product;
