const Orderservice = require("../service/OrderService");

const createOrder = async (req, res) => {
  try {
    const {
      paymentMethos,
      itemsPrice,
      shippingPrice,
      totalPrice,
      fullname,
      address,
      city,
      phone,
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
