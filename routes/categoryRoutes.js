const express = require("express");
const {
  getCategoryProductsById,
  getAllCategories,
} = require("../controllers/categoryController");

const router = express.Router();

router.route("/").get(getAllCategories);
router.route("/:id").get(getCategoryProductsById);

module.exports = router;
