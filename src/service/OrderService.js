const Order = require("../models/OrderModel");
const Product = require("../models/ProductModel");

const createOrder = async (newProduct) => {
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
  } = newProduct;

  const errorDetails = [];

  try {
    // Kiểm tra phương thức thanh toán và cập nhật trạng thái `isPaid` cho đơn hàng
    let isPaid = false;
    if (payment === "Thanh toán bằng VNPay") {
      isPaid = true;
    }

    // Tạo đơn hàng trước, sau đó mới cập nhật số lượng sản phẩm
    const createdOrder = await Order.create({
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
      isPaid, // Cập nhật trạng thái thanh toán
    });

    // Cập nhật số lượng tồn kho sản phẩm cho từng sản phẩm trong đơn hàng
    await Promise.all(
      orderItems.map(async (order) => {
        try {
          const product = await Product.findOneAndUpdate(
            {
              _id: order.product, // ID của sản phẩm
              countInStock: { $gte: order.amount }, // Kiểm tra tồn kho
            },
            {
              $inc: {
                countInStock: -order.amount, // Giảm tồn kho
                selled: +order.amount, // Tăng số lượng bán
              },
            },
            { new: true }
          );

          if (!product) {
            throw new Error(
              `Sản phẩm với ID ${order.product} không đủ số lượng tồn kho hoặc không tồn tại.`
            );
          }

          return product;
        } catch (error) {
          errorDetails.push({
            productId: order.product,
            message:
              error.message ||
              "Đã xảy ra lỗi trong quá trình cập nhật sản phẩm.",
          });
        }
      })
    );

    // Kiểm tra nếu có lỗi nào trong quá trình cập nhật sản phẩm
    if (errorDetails.length > 0) {
      throw new Error(
        "Có lỗi xảy ra trong quá trình cập nhật sản phẩm. Chi tiết: " +
          JSON.stringify(errorDetails)
      );
    }

    // Nếu tất cả sản phẩm được cập nhật thành công
    return {
      status: "ok",
      data: createdOrder,
    };
  } catch (error) {
    console.log("Error creating order:", error);

    return {
      status: "err",
      message: error.message || "Đã xảy ra lỗi không xác định.",
      code: error.status || 500,
      details: errorDetails.length > 0 ? errorDetails : undefined, // Trả về chi tiết lỗi
    };
  }
};

const deleteOrder = async (orderId) => {
  try {
    // Tìm đơn hàng theo ID và cập nhật các thuộc tính
    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      {
        deleted: true, // Thêm trường để đánh dấu xóa mềm, nếu cần
      },
      { new: true } // Trả về bản ghi đã cập nhật
    );

    // Kiểm tra xem đơn hàng có được cập nhật hay không
    if (!updatedOrder) {
      return {
        status: "err",
        message: "Đơn hàng không tồn tại.",
      };
    }

    return {
      status: "ok",
      message: "Sản phẩm đã được hủy thành công",
    };
  } catch (error) {
    return {
      status: "err",
      message: error.message,
    };
  }
};

const getOrder = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const allUser = await Order.find();
      resolve({
        status: "ok",
        data: allUser,
      });
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  createOrder,
  getOrder,
  deleteOrder,
};
