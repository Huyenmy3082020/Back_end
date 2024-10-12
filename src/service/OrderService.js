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

  const errorDetails = []; // Lưu trữ các lỗi sản phẩm

  try {
    // Cập nhật số lượng tồn kho sản phẩm
    await Promise.all(
      orderItems.map(async (order) => {
        try {
          const product = await Product.findOneAndUpdate(
            {
              _id: order.product,
              countInStock: { $gte: order.amount },
            },
            {
              $inc: {
                countInStock: -order.amount,
                selled: +order.amount,
              },
            },
            { new: true }
          );

          // Nếu sản phẩm không đủ số lượng hoặc không tồn tại
          if (!product) {
            throw new Error(
              `Sản phẩm với ID ${order.product} không đủ số lượng tồn kho hoặc không tồn tại.`
            );
          }

          return product;
        } catch (error) {
          // Lưu lỗi cho sản phẩm vào errorDetails
          errorDetails.push({
            productId: order.product,
            message:
              error.message ||
              "Đã xảy ra lỗi trong quá trình cập nhật sản phẩm.",
          });
        }
      })
    );

    // Kiểm tra nếu có lỗi nào trong errorDetails
    if (errorDetails.length > 0) {
      throw new Error(
        "Có lỗi xảy ra trong quá trình cập nhật sản phẩm. Chi tiết: " +
          JSON.stringify(errorDetails)
      );
    }

    // Nếu tất cả sản phẩm được cập nhật thành công, tạo đơn hàng
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
    });

    return {
      status: "ok",
      data: createdOrder,
    };
  } catch (error) {
    // Xử lý lỗi khi có vấn đề xảy ra
    console.log("Error creating order:", error);

    // Trả về mã trạng thái lỗi cùng thông tin lỗi
    return {
      status: "err",
      message: error.message || "Đã xảy ra lỗi không xác định.",
      code: error.status || 500,
      details: errorDetails.length > 0 ? errorDetails : undefined, // Thêm thông tin lỗi nếu có
    };
  }
};

module.exports = {
  createOrder,
};
