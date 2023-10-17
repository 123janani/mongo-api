const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Product = require("./models/product.model");

app.use(express.json());

// respond with "hello world" when a GET request is made to the homepage
app.get("/", async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({ message: "get products", data: products });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

app.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById({ _id: id });
    res.status(200).json({ message: "get products", data: product });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

app.post("/", async (req, res) => {
  try {
    console.log("body", req.body);
    const product = await Product.create(req.body);
    res.status(200).json({ message: "saved", data: product });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

app.put("/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const product = await Product.findByIdAndUpdate(_id, req.body);

    if (!product) {
      res.status(404).json({ message: "no product found" });
    }
    const updatedProduct = await Product.findById(_id);
    res.status(200).json({ message: "get products", data: updatedProduct });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

app.delete("/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    await Product.findByIdAndDelete(_id);

    res.status(200).json({ message: "deleted product" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

mongoose
  .connect(
    "ADD_MONGO_URL_HERE"
  )
  .then(() => {
    console.log("connected to database!");

    app.listen(3000, () => {
      console.log("App is running on port 3000!");
    });
  })
  .catch((error) => {
    console.log("error", error);
  });
