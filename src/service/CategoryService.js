const Category = require("../models/CategoryModel");
const Product = require("../models/ProductModel");
const createCategory = async (categoryData) => {
  const category = new Category(categoryData);
  await category.save();
  return category;
};

const getAllCategories = async () => {
  return await Category.find();
};

const getCategoryById = async (id) => {
  return await Category.findById(id);
};

const getCategoryByName = async (name) => {
  try {
    const category = await Category.findOne({ name });
    return category;
  } catch (err) {
    console.error("Error fetching category by name:", err);
    throw err; // Ném lỗi ra ngoài để xử lý
  }
};
const getCategoryBySlug = async (slug) => {
  try {
    const category = await Category.findOne({ slug });
    if (!category) {
      throw new Error("Category not found");
    }

    const products = await Product.find({ type: category._id });

    return { category, products };
  } catch (err) {
    console.error("Error fetching category or products:", err);
    throw err;
  }
};

const updateCategory = async (id, categoryData) => {
  return await Category.findByIdAndUpdate(id, categoryData, { new: true });
};

const deleteCategory = async (id) => {
  return await Category.findByIdAndDelete(id);
};

module.exports = {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  getCategoryByName,
  deleteCategory,
  getCategoryBySlug,
};
