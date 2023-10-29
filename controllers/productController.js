const Product = require("../models/productModel");
const APIFeatures = require("../utils/apiFeatures");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

const testController = catchAsync(async (req, res, next) => {
  res.status(200).json({
    status: "success",
    data: {
      test: "Test results",
    },
  });
});

const getAllProducts = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(
    Product.find(),
    // default values for page and limit
    (req.query = { page: 1, limit: 100, ...req.query })
  )
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const products = await features.query;
  // SEND RESPONSE
  res.status(200).json({
    status: "success",
    results: products.length,
    data: {
      products,
    },
  });
});

const getProductById = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  let product = Product.findById({ _id: id });
  // * select only relevant fields for category display
  product = await product.select("name description new slug image");
  //  TODO aggregate
  res.status(200).json({
    status: "success",
    data: {
      product,
    },
  });
});

const getProductByCategory = catchAsync(async (req, res, next) => {
  const { category } = req.params;
  let products = Product.find({ category });
  // * select only relevant fields for category display
  products = await products.select("name description new slug image");
  res.status(200).json({
    status: "success",
    data: {
      products,
      length: products.length,
    },
  });
});

module.exports = {
  getAllProducts,
  getProductById,
  getProductByCategory,
  testController,
};
