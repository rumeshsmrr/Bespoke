import React, { useState } from "react";

import img12 from "../assets/images/img12.png";
import img13 from "../assets/images/img13.png";
import img14 from "../assets/images/img14.png";
import { Link } from "react-router-dom";

// Mock product data
const productData = {
  name: "Soane Britain - Rattan Chair",
  description:
    "The Carousel Drawer is a stunning example of craftsmanship and timeless design. Handmade in our dedicated rattan atelier, each piece showcases meticulous attention to detail.",
  price: 350,
  category: "chair",
  stoke: 3,
  images: [
    {
      url: img12,
      public_id: "soane_britain_rattan_chair_main",
    },
    {
      url: img13,
      public_id: "soane_britain_rattan_chair_thumb1",
    },
    {
      url: img14,
      public_id: "soane_britain_rattan_chair_thumb2",
    },
  ],
  createdAt: "2024-12-01T10:00:00.000Z",
};

export default function ProductDescription() {
  const [mainImage, setMainImage] = useState(productData.images[0].url); // State for the main image
  const [zoomStyle, setZoomStyle] = useState({}); // State for zoom effect
  const [quantity, setQuantity] = useState(1); // State for product quantity

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
            {productData.images.map((image, index) => (
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
          <div className="flex flex-col  bg-secondary-200 p-8 rounded-xl">
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
              {/* <span 
              {productData.stoke > 0 ? "In stock" : "Out of stock"}
              className="ml-2 text-green-500 font-semibold">
                {productData.stoke > 0 ? "In stock" : "Out of stock"}
              </span> */}
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
