import React, { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import PropTypes from "prop-types";

// Mock Product Data
const recommendedProducts = [
  {
    id: 1,
    image: "https://via.placeholder.com/300",
    name: "Spoon back chairs",
    price: "$150",
  },
  {
    id: 2,
    image: "https://via.placeholder.com/300",
    name: "Octagonal Moorish side table",
    price: "$150",
  },
  {
    id: 3,
    image: "https://via.placeholder.com/300",
    name: "Lions head stool",
    price: "$150",
  },
  {
    id: 4,
    image: "https://via.placeholder.com/300",
    name: "Round coffee table",
    price: "$200",
  },
  {
    id: 5,
    image: "https://via.placeholder.com/300",
    name: "Minimalist desk",
    price: "$250",
  },
  {
    id: 6,
    image: "https://via.placeholder.com/300",
    name: "Elegant lounge chair",
    price: "$300",
  },
];

export default function ProductSlider({ category }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Group products into slides of 3 items
  const slides = [];
  for (let i = 0; i < recommendedProducts.length; i += 3) {
    slides.push(recommendedProducts.slice(i, i + 3));
  }

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === slides.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="flex flex-col items-center w-full">
      <h2 className="text-4xl font-bold mb-8">You may also like</h2>
      <div className="relative w-full max-w-6xl">
        {/* Left Navigation Button */}
        <button
          onClick={handlePrev}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 p-2 bg-white rounded-full shadow-md z-10"
        >
          <FaChevronLeft className="text-gray-500" />
        </button>

        {/* Slider */}
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-300"
            style={{
              transform: `translateX(-${currentIndex * 100}%)`,
            }}
          >
            {slides.map((slide, slideIndex) => (
              <div
                key={slideIndex}
                className="flex justify-center items-center w-full gap-4"
                style={{ flex: "0 0 100%" }}
              >
                {slide.map((product) => (
                  <div
                    key={product.id}
                    className="flex flex-col items-center p-4 w-64"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="rounded-lg w-64 h-64 object-cover mb-4"
                    />
                    <h3 className="text-lg font-semibold">{product.name}</h3>
                    <p className="text-xl font-bold">{product.price}</p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Right Navigation Button */}
        <button
          onClick={handleNext}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 p-2 bg-white rounded-full shadow-md z-10"
        >
          <FaChevronRight className="text-gray-500" />
        </button>
      </div>
    </div>
  );
}

PropTypes.ProductSlider = {
  category: PropTypes.string,
};
