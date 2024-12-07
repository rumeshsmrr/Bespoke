import PropTypes from "prop-types";

import { FaPlusCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function ProductCard({ products }) {
  const userId = "64c1e13e59f08b002c8e4b5a";
  const handleAddToCart = async (product) => {
    try {
      // API request body
      const requestBody = {
        userId, // Hardcoded userId
        productId: product._id,
        quantity: 1, // Default quantity
      };

      // API call
      const response = await fetch("http://localhost:5002/api/v1/cart/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();

      // Handle response
      if (response.ok) {
        alert(data.message || "Product added to cart successfully.");
      } else {
        alert(data.message || "An error occurred. Please try again.");
      }
    } catch (error) {
      console.error("Error adding product to cart:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <>
      {products.map((product, index) => (
        <div
          key={index}
          className="relative  rounded-lg overflow-hidden bg-secondary-100"
          style={{
            gridColumn: `span ${product.colSpan}`,
            gridRow: `span ${product.rowSpan}`,
          }}
        >
          {/* Product Image */}
          <Link to={`/product-description/${product._id}`}>
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover cursor-pointer transition duration-300 ease-in-out hover:opacity-50"
            />
          </Link>

          {/* Overlay for Price and Icon */}
          <div className="absolute bottom-0 left-0 right-0 h-fit   bg-secondary-100-low px-4 py-2 flex justify-between items-center">
            {/* Price */}
            <p className="text-white w-4/5  font-semibold text-lg lg:text-xl tracking-widest">
              {product.name}
            </p>

            {/* Icon */}
            <div className="bg-white p-2 w-16 h-16 rounded-tl-2xl absolute right-0 bottom-0 shadow-lg cursor-pointer flex justify-center items-center">
              <div
                className="bg-secondary-100 w-10 h-10 absolute rounded-md flex items-center justify-center"
                onClick={() => handleAddToCart(product)}
              >
                <FaPlusCircle className="text-white text-xl m-auto " />
              </div>
              <div className="absolute -top-6 right-0">
                <div id="curved-corner-bottomright"></div>
              </div>
              <div className="absolute bottom-0 -left-6">
                <div id="curved-corner-bottomright"></div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
ProductCard.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      colSpan: PropTypes.number.isRequired,
      rowSpan: PropTypes.number.isRequired,
    })
  ).isRequired,
};
