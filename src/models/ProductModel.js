const mongoose = require("mongoose");
const mongoose_delete = require("mongoose-delete");
const productSchema = new mongoose.Schema(
  {
    name: { type: String, require: true, unique: true },
    image: { type: String, require: true },
    type: { type: String, require: true },
    price: { type: Number, require: true },
    countInStock: { type: Number, require: true },
    rating: { type: Number, require: true },
    discount: { type: Number, require: true },
    selled: { type: Number, require: true },
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
