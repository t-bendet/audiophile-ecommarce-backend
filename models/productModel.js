/* eslint-disable prefer-arrow-callback */
const mongoose = require("mongoose");
const slugify = require("slugify");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "A product must have a name"],
      unique: true,
      trim: true,
      maxlength: [40, "A tour must have less or equal then 40 characters"],
      minlength: [10, "A tour must have more or equal then 10 characters"],
    },
    slug: String,
    image: {
      mobile: {
        type: String,
        required: [true, "A product must have a mobile image"],
      },
      tablet: {
        type: String,
        required: [true, "A product must have a tablet image"],
      },
      desktop: {
        type: String,
        required: [true, "A product must have a desktop image"],
      },
    },
    category: {
      type: String,
      required: [true, "A product must have a category name"],
      enum: {
        values: ["earphones", "headphones", "speakers"],
        message: "Difficulty is either : earphones, headphones, speakers",
      },
    },
    categoryImage: {
      mobile: {
        type: String,
        required: [true, "A product must have a category mobile image"],
      },
      tablet: {
        type: String,
        required: [true, "A product must have a category tablet image"],
      },
      desktop: {
        type: String,
        required: [true, "A product must have a category desktop image"],
      },
    },
    new: {
      type: Boolean,
      default: false,
    },
    price: {
      type: Number,
      required: [true, "A product must have a price"],
    },
    description: {
      type: String,
      trim: true,
      required: [true, "A product must have a description"],
    },
    features: {
      type: String,
      trim: true,
      required: [true, "A product must have a features description"],
    },
    includes: [
      {
        quantity: Number,
        item: String,
      },
    ],
    gallery: {
      first: {
        mobile: {
          type: String,
          required: [true, "A product must all gallery pictures"],
        },
        tablet: {
          type: String,
          required: [true, "A product must all gallery pictures"],
        },
        desktop: {
          type: String,
          required: [true, "A product must all gallery pictures"],
        },
      },
      second: {
        mobile: {
          type: String,
          required: [true, "A product must all gallery picturese"],
        },
        tablet: {
          type: String,
          required: [true, "A product must all gallery pictures"],
        },
        desktop: {
          type: String,
          required: [true, "A product must all gallery pictures"],
        },
      },
      third: {
        mobile: {
          type: String,
          required: [true, "A product must all gallery pictures"],
        },
        tablet: {
          type: String,
          required: [true, "A product must all gallery pictures"],
        },
        desktop: {
          type: String,
          required: [true, "A product must all gallery pictures"],
        },
      },
    },
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

// * DOCUMENT MIDDLEWARE: runs before .save() and .create().  but not on insertMany
productSchema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
