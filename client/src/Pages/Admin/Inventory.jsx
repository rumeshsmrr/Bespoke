import React, { useEffect, useState } from "react";
import AdminNav from "../../Components/Admin/AdminNav";

export default function Inventory() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:5002/api/v1/products/");
        const data = await response.json();
        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleStockChange = (productId, change) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product._id === productId
          ? { ...product, stoke: Math.max(product.stoke + change, 0) }
          : product
      )
    );
  };

  const handleSave = async (productId) => {
    const product = products.find((item) => item._id === productId);

    // Ensure all required fields are included in the request body
    const { name, price, category, description, images, stoke } = product;

    // Validation: Check if all fields are filled
    if (!name || !price || !category || !description || !images.length) {
      alert("All fields are required.");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5002/api/v1/products/${productId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            price,
            category,
            description,
            images,
            stoke,
          }), // Include all fields
        }
      );

      const data = await response.json();
      if (response.ok) {
        alert(data.message || "Product updated successfully.");
      } else {
        alert(data.message || "Failed to update product.");
      }
    } catch (error) {
      console.error("Error updating product:", error);
      alert("An error occurred while updating the product.");
    }
  };

  if (loading) {
    return <div>Loading products...</div>;
  }

  return (
    <div className="p-4">
      <AdminNav />
      {products.map((product) => (
        <div
          key={product._id}
          className="flex justify-between items-center border-2 border-secondary-100 p-4 rounded-lg mb-4 bg-white"
        >
          {/* Product Image and Info */}
          <div className="flex items-center gap-4">
            <img
              src={product.images[0]?.url}
              alt={product.name}
              className="w-20 h-20 object-cover rounded-lg"
            />
            <div>
              <h3 className="text-xl font-semibold">{product.name}</h3>
              <p className="text-secondary-100">{product.category}</p>
            </div>
          </div>

          {/* Stock Controls */}
          <div className="flex items-center gap-4">
            <p className="font-semibold">Product stock:</p>
            <div className="flex items-center">
              <button
                onClick={() => handleStockChange(product._id, -1)}
                className="px-2 py-1 bg-gray-200 rounded-l-lg hover:bg-gray-300"
              >
                -
              </button>
              <div className="px-4 py-1 border bg-gray-100">
                {product.stoke}
              </div>
              <button
                onClick={() => handleStockChange(product._id, 1)}
                className="px-2 py-1 bg-gray-200 rounded-r-lg hover:bg-gray-300"
              >
                +
              </button>
            </div>
          </div>

          {/* Stock Status and Save Button */}
          <div className="flex items-center gap-4">
            <div
              className={`px-4 py-2 rounded-lg ${
                product.stoke > 0
                  ? "bg-green-100 text-green-600"
                  : "bg-red-100 text-red-600"
              }`}
            >
              {product.stoke > 0 ? "In stock" : "Out of stock"}
            </div>
            <button
              onClick={() => handleSave(product._id)}
              className="px-4 py-2 bg-secondary-100 text-white rounded-lg hover:bg-secondary-200"
            >
              Save
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
