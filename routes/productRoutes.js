const express = require("express");
const {
  testController,
  getAllProducts,
  getProductById,
  getProductByCategory,
} = require("../controllers/productController");

const router = express.Router();

router.route("/").get(getAllProducts);

router.route("/:id").get(getProductById);

router.route("/category/:category").get(getProductByCategory);

router.route("/test").get(testController);

module.exports = router;
