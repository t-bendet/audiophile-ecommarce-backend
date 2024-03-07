const Product = require("../models/productModel");
const APIFeatures = require("../utils/apiFeatures");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

const getAllProducts = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(
    Product.find(),
    // default values for page and limit
    { page: 1, limit: 100, ...req.query }
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
    products,
  });
});

const getProductById = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const product = await Product.findById({ _id: id });
  if (!product) {
    return next(new AppError("No product found with that ID", 404));
  }
  // * select only relevant fields for category display
  res.status(200).json({
    status: "success",
    product,
  });
});

const getFeaturedProduct = catchAsync(async (req, res, next) => {
  let product = await Product.findOne({
    "indicators.featuredProduct": { $eq: true },
  }).select("heroImage name new");
  if (!product) {
    return next(new AppError("Featured product was not found", 404));
  }
  // * select only relevant fields for category display
  res.status(200).json({
    status: "success",
    product,
  });
});

const getSpotlightProducts = catchAsync(async (req, res, next) => {
  let products = await Product.find({
    "indicators.spotlightProduct": { $eq: true },
  })
    .sort({ "indicators.spotlightProductIndex": 1 })
    .select("name spotlightImage");
  if (!products) {
    return next(new AppError("No product found with that ID", 404));
  }
  // * select only relevant fields for category display
  res.status(200).json({
    status: "success",
    products,
    length: products.length,
  });
});

const getSuggestedProductsByName = catchAsync(async (req, res, next) => {
  const { filterBy = [] } = req.query;
  if (!Array.isArray(filterBy)) {
    return next(new AppError("Query String must be an array of products", 404));
  }
  const others = await Product.aggregate([
    {
      $match: { name: { $in: filterBy } },
    },
    {
      $project: { _id: 1, suggestionImage: 1, name: 1 },
    },
  ]);
  // * select only relevant fields for category display
  res.status(200).json({
    status: "success",
    others,
  });
});

module.exports = {
  getAllProducts,
  getProductById,
  getFeaturedProduct,
  getSpotlightProducts,
  getSuggestedProductsByName,
};
