const express = require("express");
const {
  // getCategoryProductsByName,
  getCategoryProductsById,
  getAllCategories,
} = require("../controllers/categoryController");

const router = express.Router();

router.route("/").get(getAllCategories);
// router.route("/:name").get(getCategoryProductsByName);
router.route("/:id").get(getCategoryProductsById);

module.exports = router;
