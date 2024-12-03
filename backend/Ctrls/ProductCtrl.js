const Product = require("../Models/Product");
const cloudinary = require("../config/cloudinary");

// Create Product with Multiple Images
exports.createProduct = async (req, res) => {
  try {
    const { name, description, price, category, stoke } = req.body;

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
      stoke,
    });

    try {
      await product.save();
    } catch (error) {
      // If saving the product fails, remove the uploaded images from Cloudinary
      await Promise.all(
        uploadedImages.map(async (image) => {
          await cloudinary.uploader.destroy(image.public_id);
        })
      );
      throw error; // Re-throw the error to be caught by the outer catch block
    }

    await product.save();
    res.status(201).json({ message: "Product created successfully", product });
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ message: error.message || "Internal server error" });
  }
};

// Delete Product with Multiple Images
exports.deleteProduct = async (req, res) => {
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
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: error.message || "Internal server error" });
  }
};

//get single product
exports.getSingleProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ message: error.message || "Internal server error" });
  }
};

// Update Product
exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, category, stoke } = req.body;

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    product.name = name;
    product.description = description;
    product.price = price;
    product.category = category;
    product.stoke = stoke;

    await product.save();
    res.status(200).json({ message: "Product updated successfully", product });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ message: error.message || "Internal server error" });
  }
};

//product by category
exports.getProductByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const products = await Product.find({ category });
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products by category:", error);
    res.status(500).json({ message: error.message || "Internal server error" });
  }
};
