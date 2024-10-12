const Order = require("../models/OrderModel");

const createOrder = async (newProduct) => {
  try {
    const {
      paymentMethos,
      itemsPrice,
      shippingPrice,
      totalPrice,
      orderItems,
      fullname,
      address,
      city,
      phone,
    } = newProduct;

    const createOrder = await Order.create({
      paymentMethos,
      itemsPrice,
      shippingPrice,
      totalPrice,
      orderItems,
      fullname,
      address,
      city,
      phone,
    });

    return {
      status: "ok",
      data: createOrder,
    };
  } catch (error) {
    return {
      status: "err",
      message: error.message,
    };
  }
};
module.exports = {
  createOrder,
};
