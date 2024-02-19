const Category = require("../models/categoryModel");
// const APIFeatures = require("../utils/apiFeatures");
const catchAsync = require("../utils/catchAsync");

const getAllCategories = catchAsync(async (req, res, next) => {
  const data = await Category.find({});
  res.status(200).json({
    status: "success",
    results: data.length,
    data,
  });
});

const getCategoryProductsByName = catchAsync(async (req, res, next) => {
  const { name } = req.params;
  console.log(req.params);
  const data = await Category.findOne({ name });
  // SEND RESPONSE
  console.log(data);
  res.status(200).json({
    status: "success",
    results: data.products.length,
    data,
  });
});

const getCategoryProductsById = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const data = await Category.findOne({ _id: id });
  // SEND RESPONSE
  console.log(data);
  res.status(200).json({
    status: "success",
    results: data.products.length,
    data,
  });
});
getCategoryProductsById;

module.exports = {
  getAllCategories,
  getCategoryProductsByName,
  getCategoryProductsById,
};
