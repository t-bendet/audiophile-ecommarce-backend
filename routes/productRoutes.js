const express = require("express");
const {
  getAllProducts,
  getProductById,
  getFeaturedProduct,
  getSpotlightProducts,
  getSuggestedProductsByName,
} = require("../controllers/productController");

const router = express.Router();

router.route("/featuredProduct").get(getFeaturedProduct);

router.route("/spotlightProducts").get(getSpotlightProducts);

router.route("/").get(getAllProducts);

router.route("/getSuggestedProductsByName").get(getSuggestedProductsByName);

router.route("/:id").get(getProductById);

module.exports = router;
