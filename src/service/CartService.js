const Cart = require("../models/CartModel");
const Product = require("../models/ProductModel");

const createCart = async (cartData) => {
  const cart = new Cart(cartData);
  await cart.save();
};
const findCartByUser = async (userId) => {
  try {
    const cart = await Cart.findOne({ user: userId });
    return cart;
  } catch (error) {
    throw new Error("Unable to find cart for this user");
  }
};
const updateCart = async (cartId, updateData) => {
  try {
    const updatedCart = await Cart.findByIdAndUpdate(
      cartId,
      { $set: updateData },
      { new: true } // Trả về giỏ hàng đã được cập nhật
    );
    return updatedCart;
  } catch (error) {
    throw new Error("Unable to update cart");
  }
};
const getCartByUser = async (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const cartUser = await Cart.findOne({ user: userId });
      resolve({
        status: "ok",
        data: cartUser,
      });
    } catch (error) {
      reject(error);
    }
  });
};
const alterAmount = async (productId, altam) => {
  try {
    // Tìm sản phẩm dựa vào productId trong giỏ hàng
    const existingItem = await Cart.findOne(
      { "items.product": productId },
      { "items.$": 1 }
    );

    if (!existingItem) {
      return {
        status: "fail",
        message: "Product not found in the cart",
      };
    }

    // Tăng hoặc giảm số lượng dựa vào altam
    if (altam === "increase") {
      // Tăng số lượng sản phẩm lên 1
      await Cart.updateOne(
        { "items.product": productId },
        { $inc: { "items.$.amount": 1 } }
      );
    } else if (altam === "decrease") {
      // Giảm số lượng sản phẩm đi 1
      await Cart.updateOne(
        { "items.product": productId },
        { $inc: { "items.$.amount": -1 } }
      );
    }

    // Lấy lại giỏ hàng sau khi cập nhật
    const updatedCart = await Cart.findOne({ "items.product": productId });

    return {
      status: "success",
      data: updatedCart,
    };
  } catch (error) {
    // Xử lý lỗi
    return {
      status: "error",
      message: error.message,
    };
  }
};

const deleteAllCard = async (cartId, productId) => {
  try {
    const updatedCart = await Cart.findByIdAndUpdate(
      cartId,
      { $pull: { items: { product: productId } } }, // Loại bỏ sản phẩm theo ID
      { new: true } // Trả về giỏ hàng sau khi đã cập nhật
    );

    if (!updatedCart) {
      throw new Error("Cart not found");
    }

    return updatedCart;
  } catch (error) {
    throw new Error("Unable to delete product from cart");
  }
};

module.exports = {
  createCart,
  findCartByUser,
  updateCart,
  getCartByUser,
  alterAmount,
  deleteAllCard,
};
