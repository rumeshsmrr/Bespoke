const express = require("express");
const {
  createProduct,
  getProducts,
  deleteProduct,
  getSingleProduct,
  getSuggestedProducts,
  getNewProduct,
  updateProduct,
} = require("../Ctrls/ProductCtrl");
const upload = require("../utils/multer");

const router = express.Router();

// Create Product with Multiple Images
router.post("/create", upload.array("images", 5), createProduct); // Max 5 images

// Get All Products
router.get("/", getProducts);

router.get("/newProduct", getNewProduct);
// Delete Product
router.delete("/:id", deleteProduct);

// Get Single Product
router.get("/:id", getSingleProduct);

//get product by category
router.get("/Suggestion/:category", getSuggestedProducts);

// Update Product
router.put("/:id", upload.array("images", 5), updateProduct); // Max 5 images

module.exports = router;
