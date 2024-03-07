const express = require("express");
const {
  getCategoryProductsByName,
  getAllCategories,
} = require("../controllers/categoryController");

const router = express.Router();

router.route("/").get(getAllCategories);
router.route("/:name").get(getCategoryProductsByName);

module.exports = router;
