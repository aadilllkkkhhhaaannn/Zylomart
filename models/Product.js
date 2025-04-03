const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    image: String,
    brand: String,
    category: String,
    totalStock: String,
    price: Number,
    salePrice: Number,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", ProductSchema);
