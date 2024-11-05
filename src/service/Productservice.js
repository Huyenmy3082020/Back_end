const Product = require("../models/ProductModel");
const Cart = require("../models/CartModel");

const createProduct = async (newProduct) => {
  try {
    const {
      name,
      image,
      type,
      price,
      countInStock,
      rating,
      description,
      selled,
      discount,
    } = newProduct;

    const createdProduct = await Product.create({
      name,
      image,
      type,
      price,
      countInStock,
      rating,
      description,
      selled,
      discount,
    });

    return {
      status: "ok",
      data: createdProduct,
    };
  } catch (error) {
    return {
      status: "err",
      message: error.message,
    };
  }
};
const getProduct = async (limit, page, sort, filter) => {
  const totalProduct = await Product.countDocuments();
  return new Promise(async (resolve, reject) => {
    try {
      if (filter) {
        const ObjectFilter = {};
        ObjectFilter[filter[0]] = filter[1];
        const label = filter[0];
        const allProductFilter = await Product.find({
          [label]: { $regex: filter[1] },
        })
          .limit(limit)
          .skip(page * limit);
        const totalProductFilter = Object.keys(allProductFilter).length;
        resolve({
          status: "ok",
          data: allProductFilter,
          totalProduct: totalProductFilter,
          pageCurrent: Number(page + 1),
          totalPage: Math.ceil(totalProduct / limit),
        });
      }
      if (sort) {
        const ObjectSort = {};

        ObjectSort[sort[1]] = sort[0];
        const allProductSort = await Product.find()
          .limit(limit)
          .skip(page * limit)
          .sort(ObjectSort);
        resolve({
          status: "ok",
          data: allProductSort,
          totalProduct: totalProduct,
          pageCurrent: Number(page + 1),
          totalPage: Math.ceil(totalProduct / limit),
        });
      }

      const allProduct = await Product.find()
        .limit(limit)
        .skip(page * limit);
      resolve({
        status: "ok",
        data: allProduct,
        totalProduct: totalProduct,
        pageCurrent: Number(page + 1),
        totalPage: Math.ceil(totalProduct / limit),
      });
    } catch (error) {
      reject(error);
    }
  });
};

const getProductTrash = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const products = await Product.findDeleted();
      resolve({
        status: "ok",
        data: products,
      });
    } catch (error) {
      reject(error);
    }
  });
};

const updateProduct = async (productId, updateData) => {
  try {
    // Tìm và cập nhật sản phẩm
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return {
        status: "err",
        message: "Sản phẩm không tìm thấy",
      };
    }

    return {
      status: "ok",
      data: updatedProduct,
    };
  } catch (error) {
    return {
      status: "err",
      message: error.message,
    };
  }
};
const deleteProduct = async (productId) => {
  try {
    const checkProductId = await Product.findById(productId);
    if (!checkProductId) {
      return {
        status: "err",
        mess: "Sản phẩm không tìm thấy",
      };
    }

    // Xóa mềm bằng phương thức của mongoose-delete
    await Product.deleteById(productId); // Phương thức này sẽ đánh dấu deletedAt thay vì xóa vĩnh viễn

    return {
      status: "ok",
      mess: "Sản phẩm đã được xóa mềm thành công",
    };
  } catch (error) {
    return {
      status: "err",
      message: error.message,
    };
  }
};
const destroyProduct = async (productId) => {
  try {
    console.log(productId);
    await Product.findByIdAndDelete(productId);
    return {
      status: "ok",
      mess: "Sản phẩm đã được vinh vien thành công",
    };
  } catch (error) {
    return {
      status: "err",
      message: error.message,
    };
  }
};
const deleteMany = async (ids) => {
  try {
    const result = await Product.deleteMany({ _id: { $in: ids } });
    return {
      status: "ok",
      message: `${result.deletedCount} sản phẩm đã được xóa vĩnh viễn`,
    };
  } catch (error) {
    return {
      status: "err",
      message: error.message,
    };
  }
};
const getProductbyId = async (productId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const getProductbyId = await Product.findById(productId);
      resolve({
        data: getProductbyId,
      });
    } catch (error) {
      reject(error);
    }
  });
};
const getProductType = async (type) => {
  try {
    const productType = await Product.find({ type });
    return { data: productType };
  } catch (error) {
    throw new Error(error.message);
  }
};

const getAllType = async () => {
  try {
    const types = await Product.distinct("type");
    return {
      data: types,
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

const restoreProduct = async (data) => {
  try {
    // Giả sử `Product.restore` nhận cả id và data để khôi phục sản phẩm
    await Product.restore(data);

    return {
      status: "ok",
      mess: "Sản phẩm đã được khôi phục thành công",
    };
  } catch (error) {
    return {
      status: "err",
      message: error.message,
    };
  }
};

const search = async (data) => {
  try {
  } catch (error) {}
};

module.exports = {
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
  getProductbyId,
  getProductTrash,
  restoreProduct,
  destroyProduct,
  deleteMany,
  getAllType,
  getProductType,
  search,
};
