import React, { useState, useEffect } from "react";
import AdminNav from "../../Components/Admin/AdminNav";
import SearchBar from "../../Components/Admin/SearchBar";
import ProductCardAdmin from "../../Components/Admin/ProductCardAdmin";
import AddProductForm from "../../Components/Admin/AddProductForm";
import { FaCirclePlus } from "react-icons/fa6";

export default function ProductAdding() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isAdding, setIsAdding] = useState(false); // Controls Add Product Form visibility

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:5002/api/v1/products/");
        const data = await response.json();
        setProducts(data); // Set fetched products
        setFilteredProducts(data); // Initially show all products
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  // Handle search
  const handleSearch = (query) => {
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  // Handle product creation
  const handleCreateProduct = async (formData) => {
    try {
      const response = await fetch(
        "http://localhost:5002/api/v1/products/create",
        {
          method: "POST",
          body: formData, // Send FormData directly
        }
      );

      const data = await response.json();

      if (response.ok) {
        setProducts((prev) => [...prev, data.product]);
        setFilteredProducts((prev) => [...prev, data.product]);
        setIsAdding(false);
        alert(data.message || "Product created successfully!");
      } else {
        alert(data.message || "Failed to create product.");
      }
    } catch (error) {
      console.error("Error creating product:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="p-4">
      <AdminNav />
      <div className="flex justify-between mb-4">
        <SearchBar onSearch={handleSearch} />
        <div
          className="px-4 py-2 w-fit h-fit flex items-center gap-2 rounded-lg bg-secondary-100 cursor-pointer"
          onClick={() => setIsAdding(true)}
        >
          <FaCirclePlus className="text-primary" />
          <div className="text-primary font-semibold">Add Product</div>
        </div>
      </div>
      {isAdding ? (
        <AddProductForm
          onCreate={handleCreateProduct}
          onCancel={() => setIsAdding(false)}
        />
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {filteredProducts.map((product) => (
            <ProductCardAdmin
              key={product._id}
              product={product}
              onDelete={(deletedProductId) => {
                // Remove the deleted product from the state
                setProducts((prevProducts) =>
                  prevProducts.filter((p) => p._id !== deletedProductId)
                );
                setFilteredProducts((prevFiltered) =>
                  prevFiltered.filter((p) => p._id !== deletedProductId)
                );
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
