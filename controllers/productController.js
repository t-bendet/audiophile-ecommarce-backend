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
  // EXECUTE QUERY
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

module.exports = {
  getAllProducts,
  testController,
};
