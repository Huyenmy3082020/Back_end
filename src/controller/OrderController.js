const Orderservice = require("../service/OrderService");
const EmailService = require("../service/EmailSevice");

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
    console.log(req.body);

    const result = await Orderservice.createOrder(req.body);

    return res.status(200).json(result);
  } catch (error) {
    return res.status(200).json({
      status: "err",
      error: error.message,
    });
  }
};
const getOrder = async (req, res) => {
  try {
    const response = await Orderservice.getOrder();
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};

const deleteOrder = async (req, res) => {
  try {
    const orderId = req.params.id;

    const result = await Orderservice.deleteOrder(orderId);

    if (result.status === "err") {
      return res.status(400).json(result);
    }

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({
      status: "err",
      error: error.message,
    });
  }
};

module.exports = {
  createOrder,
  getOrder,
  deleteOrder,
};
