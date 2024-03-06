const Category = require("../models/categoryModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

const getAllCategories = catchAsync(async (req, res, next) => {
  const categories = await Category.find({});
  res.status(200).json({
    status: "success",
    results: categories.length,
    categories,
  });
});

const getCategoryProductsByName = catchAsync(async (req, res, next) => {
  const { name: categoryName } = req.params;
  const data = await Category.findOne({ name: categoryName });
  if (!data) {
    return next(new AppError("No category found with that ID", 404));
  }
  const { name, products, id } = data;
  // SEND RESPONSE
  res.status(200).json({
    status: "success",
    results: products.length,
    id,
    name,
    products,
  });
});

module.exports = {
  getAllCategories,
  getCategoryProductsByName,
};
