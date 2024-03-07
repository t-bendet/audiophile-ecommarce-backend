const fs = require("fs");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("../../models/productModel");
const Category = require("../../models/categoryModel");

dotenv.config({ path: "./config.env" });

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose.connect(DB).then(() => console.log("DB connection successful!"));

// READ JSON FILE
const products = JSON.parse(
  fs.readFileSync(`${__dirname}/products-simple.json`, "utf-8")
);

// IMPORT DATA INTO DB
// TODO this is shit code,redo it

const importData = async () => {
  try {
    await Product.create(products);
    const categories = await Product.aggregate([
      {
        $group: {
          _id: "$category",
          products: { $push: "$_id" },
        },
      },
      {
        $addFields: { name: "$_id" },
      },
      {
        $project: {
          _id: 0,
        },
      },
    ]);

    const categoryThumb = await Product.aggregate([
      {
        $match: { "indicators.categoryThumb": { $eq: true } },
      },
      {
        $project: {
          _id: 1,
          category: 1,
        },
      },
    ]);
    const data = categories.map((item) => {
      const bla = categoryThumb.find((x) => x.category === item.name);
      return {
        ...item,
        categoryThumbnail: bla._id,
      };
    });
    await Category.create(data);
    console.log("Data successfully loaded!");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

// DELETE ALL DATA FROM DB
const deleteData = async () => {
  try {
    await Product.deleteMany();
    await Category.deleteMany();
    console.log("Data successfully deleted!");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === "--import") {
  importData();
} else if (process.argv[2] === "--delete") {
  deleteData();
}
