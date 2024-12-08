import React, { useEffect, useState } from "react";
import AdminNav from "../../Components/Admin/AdminNav";
import SearchBar from "../../Components/Admin/SearchBar";
import ProductCardAdmin from "../../Components/Admin/ProductCardAdmin";
import { FaCirclePlus } from "react-icons/fa6";

export default function ProductAdding() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

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

  return (
    <div className="p-4">
      <AdminNav />
      <div className="flex justify-between mb-4">
        <SearchBar onSearch={handleSearch} />
        <div className="px-4 py-2 w-fit h-fit flex items-center gap-2 rounded-lg bg-secondary-100 cursor-pointer">
          <FaCirclePlus className="text-primary" />
          <div className="text-primary font-semibold">Add Product</div>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4">
        {filteredProducts.map((product) => (
          <ProductCardAdmin key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}
