const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "please enter a product name"],
    },
    quantity: {
      type: Number,
      requires: [true],
      default: 1,
    },
    image: {
      type: String,
      required: [false],
    },
    price: {
      type: Number,
      requires: [true],
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model('Product',productSchema);

module.exports = Product;