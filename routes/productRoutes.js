const express = require("express");
const {
  testController,
  getAllProducts,
} = require("../controllers/productController");

const router = express.Router();

router.route("/").get(getAllProducts);

router.route("/test").get(testController);

module.exports = router;
