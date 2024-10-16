// controllers/CategoryController.js

const CategoryService = require("../service/CategoryService");

const createCategory = async (req, res) => {
  try {
    const { name, image } = req.body;

    const categoryData = {
      name,
      image,
    };
    const result = await CategoryService.createCategory(categoryData);
    return res.status(201).json({
      status: "success",
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      status: "err",
      error: error.message,
    });
  }
};

const getOrder = async (req, res) => {
  try {
    const response = await CategoryService.getAllCategories();
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};

const getCategoryByname = async (req, res) => {
  try {
    const name = req.params.name; // Lấy tên từ params
    console.log("Category name:", name);
    const response = await CategoryService.getCategoryByName(name);

    if (!response) {
      return res.status(404).json({
        status: "err",
        message: "Category not found",
      });
    }

    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      status: "err",
      message: error.message,
    });
  }
};
const getCategoryByslug = async (req, res) => {
  try {
    const slug = req.params.slug;

    const response = await CategoryService.getCategoryBySlug(slug);

    if (!response) {
      return res.status(404).json({
        status: "err",
        message: "Category not found",
      });
    }

    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      status: "err",
      message: error.message,
    });
  }
};

module.exports = {
  createCategory,
  getOrder,
  getCategoryByname,
  getCategoryByslug,
};
