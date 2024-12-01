const express = require("express");
const {
  createProduct,
  getProducts,
  deleteProduct,
  getSingleProduct,
} = require("../Ctrls/ProductCtrl");
const upload = require("../utils/multer");

const router = express.Router();

// Create Product with Multiple Images
router.post("/create", upload.array("images", 5), createProduct); // Max 5 images

// Get All Products
router.get("/", getProducts);

// Delete Product
router.delete("/:id", deleteProduct);

// Get Single Product
router.get("/:id", getSingleProduct);

module.exports = router;
