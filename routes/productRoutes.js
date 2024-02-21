const express = require("express");
const {
  getAllProducts,
  getProductById,
  getFeaturedProduct,
  getSpotlightProducts,
} = require("../controllers/productController");

const router = express.Router();

router.route("/featuredProduct").get(getFeaturedProduct);

router.route("/spotlightProducts").get(getSpotlightProducts);

router.route("/").get(getAllProducts);

router.route("/:id").get(getProductById);

module.exports = router;
