const Category = require("../models/categoryModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

const getAllCategories = catchAsync(async (req, res, next) => {
  const categories = await Category.find({});
  res.status(200).json({
    status: "success",
    results: categories.length,
    data: categories,
  });
});

const getCategoryProductsById = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const data = await Category.findOne({ _id: id });
  if (!data) {
    return next(new AppError("No category found with that ID", 404));
  }
  const { name, products } = data;
  // SEND RESPONSE
  res.status(200).json({
    status: "success",
    results: products.length,
    id,
    name,
    data: products,
  });
});
getCategoryProductsById;

module.exports = {
  getAllCategories,
  getCategoryProductsById,
};
