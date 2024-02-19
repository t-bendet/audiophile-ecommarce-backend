const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: String,
    categoryThumbnail: {
      type: mongoose.Schema.ObjectId,
      ref: "Product",
    },
    products: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Product",
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

categorySchema.pre("findOne", function (next) {
  this.populate({
    path: "products",
    select: "name description categoryImage new",
  });
  next();
});

categorySchema.pre("find", function (next) {
  this.populate({
    path: "categoryThumbnail",
    select: "thumb",
  });
  next();
});

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
