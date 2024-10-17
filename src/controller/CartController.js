const CartService = require("../service/CartService");

const createCart = async (req, res) => {
  try {
    const { user, items, totalPrice } = req.body;

    // Tìm giỏ hàng hiện tại của user
    const existingCart = await CartService.findCartByUser(user);

    if (existingCart) {
      // Duyệt qua các items để kiểm tra item có tồn tại hay không
      items.forEach((newItem) => {
        const existingItem = existingCart.items.find((item) =>
          item.product.equals(newItem.product)
        );
        if (existingItem) {
          existingItem.amount += newItem.amount;
        } else {
          // Nếu item chưa tồn tại, thêm vào giỏ hàng
          existingCart.items.push(newItem);
        }
      });

      // Cập nhật giỏ hàng với items đã thay đổi
      const updatedCart = await CartService.updateCart(existingCart._id, {
        items: existingCart.items,
        totalPrice: existingCart.totalPrice + totalPrice,
      });

      return res.status(200).json({
        status: "success",
        data: updatedCart,
      });
    } else {
      // Nếu user chưa có giỏ hàng, tạo giỏ hàng mới
      const cartData = {
        user,
        items,
        totalPrice,
      };

      const result = await CartService.createCart(cartData);
      return res.status(201).json({
        status: "success",
        data: result,
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: "err",
      error: error.message,
    });
  }
};

const getCartByUser = async (req, res) => {
  try {
    const useID = req.params.id;

    const response = await CartService.getCartByUser(useID);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};

const alterAmount = async (req, res) => {
  try {
    const { userId, productId, altam } = req.body;

    const existingCart = await CartService.findCartByUser(userId);
    if (existingCart) {
      const product = existingCart.items.find(
        (item) => item.product.toString() === productId
      );
      if (product) {
        if (altam === "increasa") {
          product.amount += 1;
        } else if (altam === "decreasa") {
          product.amount -= 1;
        }
        await existingCart.save();
        return res.status(200).json({
          message: "Số lượng sản phẩm đã được cập nhật thành công!",
          cart: existingCart,
        });
      } else {
        return res
          .status(404)
          .json({ message: "Sản phẩm không có trong giỏ hàng!" });
      }
    } else {
      return res.status(404).json({ message: "Giỏ hàng không tồn tại!" });
    }
  } catch (error) {
    console.error("Lỗi trong quá trình cập nhật số lượng:", error);
    return res.status(500).json({ message: "Đã có lỗi xảy ra!" });
  }
};

const deleteAllCard = async (req, res) => {
  try {
    const { orderID, idProduct } = req.body;
    await CartService.deleteAllCard(orderID, idProduct);

    return res.status(200).json({ status: "ok" });
  } catch (error) {
    return res.status(400).json({
      status: "err",
      message: "Lỗi khi xóa tất cả giỏ hàng",
    });
  }
};

module.exports = {
  createCart,
  getCartByUser,
  alterAmount,
  deleteAllCard,
};
