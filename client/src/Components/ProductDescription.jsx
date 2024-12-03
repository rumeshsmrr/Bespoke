import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";

export default function ProductDescription() {
  const { id } = useParams(); // Get product ID from the route parameters

  console.log("id", id);
  const [productData, setProductData] = useState(null); // State to hold the product data
  const [mainImage, setMainImage] = useState(""); // State for the main image
  const [zoomStyle, setZoomStyle] = useState({}); // State for zoom effect
  const [quantity, setQuantity] = useState(1); // State for product quantity
  const [loading, setLoading] = useState(true); // State for loading

  // Fetch product by ID
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `http://localhost:5002/api/v1/products/${id}`
        );
        const data = await response.json();
        console.log(data);
        setProductData(data); // Set fetched product data
        setMainImage(data.images?.[0]?.url || ""); // Set the main image to the first image in the array
        setLoading(false); // Stop loading
      } catch (error) {
        console.error("Error fetching product:", error);
        setLoading(false); // Stop loading even if there is an error
      }
    };

    fetchProduct();
  }, [id]);

  const handleThumbnailClick = (image) => {
    setMainImage(image);
  };

  const handleIncrease = () => setQuantity((prev) => prev + 1);
  const handleDecrease = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomStyle({
      backgroundImage: `url(${mainImage})`,
      backgroundPosition: `${x}% ${y}%`,
      backgroundSize: "200%", // Adjust for zoom level
    });
  };

  const handleMouseLeave = () => {
    setZoomStyle({});
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    );
  }

  if (!productData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Product not found.
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-7xl bg-primary rounded-lg p-8 grid grid-cols-1 lg:grid-cols-2 gap-8 ">
        {/* Left Section: Product Image and Thumbnails */}
        <div className="flex flex-col items-center">
          {/* Main Product Image */}
          <div
            className="w-full h-auto relative rounded-lg overflow-hidden"
            style={{ height: "500px" }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <img
              src={mainImage}
              alt="Product"
              className="rounded-lg object-cover w-full h-full"
              style={zoomStyle.backgroundImage ? { opacity: 0 } : {}}
            />
            {zoomStyle.backgroundImage && (
              <div
                className="absolute inset-0 rounded-lg"
                style={{
                  backgroundImage: zoomStyle.backgroundImage,
                  backgroundPosition: zoomStyle.backgroundPosition,
                  backgroundSize: zoomStyle.backgroundSize,
                  height: "100%",
                }}
              ></div>
            )}
          </div>
          {/* Thumbnails */}
          <div className="flex justify-start w-full gap-4 mt-4">
            {productData.images?.map((image, index) => (
              <img
                key={index}
                src={image.url}
                alt={`Thumbnail ${index + 1}`}
                className={`w-24 h-24 object-cover rounded-lg cursor-pointer border-2 ${
                  mainImage === image.url
                    ? "border-secondary-100"
                    : "border-transparent"
                }`}
                onClick={() => handleThumbnailClick(image.url)}
              />
            ))}
          </div>
        </div>

        {/* Right Section: Product Details */}
        <div className="flex flex-col">
          <div className="flex flex-col bg-secondary-200 p-8 rounded-xl">
            <h1 className="text-4xl font-bold text-secondary-100 mb-4">
              {productData.name}
            </h1>
            <p className="text-secondary-100 text-sm mb-2">by Artisan</p>
            <p className="text-3xl font-bold text-secondary-100">
              ${productData.price}
            </p>
            <p className="text-secondary-100 mt-4">{productData.description}</p>
            <div className="flex items-center mt-6">
              <span className="text-secondary-100 font-semibold">
                Available:
              </span>
              {productData.stoke > 0 ? (
                <span className="ml-2 text-green-500 font-semibold">
                  In stock
                </span>
              ) : (
                <span className="ml-2 text-red-500 font-semibold">
                  Out of stock
                </span>
              )}
            </div>
            {/* Quantity Selector */}
            <div className="flex items-center mt-6">
              <span className="text-secondary-100 font-semibold mr-4">
                Quantity
              </span>
              <button
                onClick={handleDecrease}
                className="w-10 h-10 flex items-center justify-center bg-secondary-200 rounded-lg text-secondary-100 hover:bg-secondary-100 hover:text-secondary-200 transition"
              >
                -
              </button>
              <span className="mx-4 text-secondary-100 font-bold">
                {quantity}
              </span>
              <button
                onClick={handleIncrease}
                className="w-10 h-10 flex items-center justify-center bg-secondary-200 rounded-lg text-secondary-100 hover:bg-secondary-100 hover:text-secondary-200 transition"
              >
                +
              </button>
            </div>
            {/* Total Price */}
            <div className="flex items-center mt-6">
              <span className="text-secondary-100 font-semibold mr-4">
                Price
              </span>
              <span className="bg-secondary-200 px-4 py-2 rounded-lg text-secondary-100 font-bold">
                ${productData.price * quantity}
              </span>
            </div>
            {/* Add to Cart Button */}
            <Link to="/cart">
              <button className="mt-8 px-6 py-3 bg-secondary-100 text-primary font-bold rounded-lg shadow-md hover:bg-secondary-200 hover:text-secondary-100 transition">
                Add to Cart
              </button>
            </Link>
          </div>
          {/* Continue Shopping Button */}
          <Link to="/product-list" className="w-full flex justify-end">
            <button className="mt-4 px-6 py-3 border-2 border-secondary-100 text-secondary-100 font-bold rounded-lg hover:bg-secondary-100 hover:text-primary transition">
              Continue Shopping
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

ProductDescription.propTypes = {
  productID: PropTypes.string,
};
