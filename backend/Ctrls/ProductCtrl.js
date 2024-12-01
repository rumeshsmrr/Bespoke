const Product = require("../Models/Product");
const cloudinary = require("../config/cloudinary");

// Create Product with Multiple Images
const createProduct = async (req, res) => {
  try {
    const { name, description, price, category } = req.body;

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No images uploaded" });
    }

    // Upload each image to Cloudinary and store the URLs and public IDs
    const uploadedImages = await Promise.all(
      req.files.map(async (file) => {
        const { path, filename } = file;
        return { url: path, public_id: filename };
      })
    );

    // Create and save the product
    const product = new Product({
      name,
      description,
      price,
      category,
      images: uploadedImages,
    });

    await product.save();
    res.status(201).json({ message: "Product created successfully", product });
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ message: error.message || "Internal server error" });
  }
};

// Delete Product with Multiple Images
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Remove all images from Cloudinary
    await Promise.all(
      product.images.map(async (image) => {
        await cloudinary.uploader.destroy(image.public_id);
      })
    );

    // Remove the product from the database
    await Product.findByIdAndDelete(id);

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ message: error.message || "Internal server error" });
  }
};

// Get All Products
const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: error.message || "Internal server error" });
  }
};

module.exports = {
  createProduct,
  getProducts,
  deleteProduct,
};
