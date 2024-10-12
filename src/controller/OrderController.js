const Orderservice = require("../service/OrderService");

const createOrder = async (req, res) => {
  try {
    const {
      orderItems,
      payment,
      itemPrices,
      city,
      phone,
      name,
      shippingPrice,
      address,
      totalPrice,
      user,
    } = req.body;

    const result = await Orderservice.createOrder(req.body);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(200).json({
      status: "err",
      error: error.message,
    });
  }
};

module.exports = { createOrder };
