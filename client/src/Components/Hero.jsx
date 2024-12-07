import React, { useEffect, useState } from "react";

export default function Hero() {
  const [heroProduct, setHeroProduct] = useState(null); // State to hold the product data
  const [loading, setLoading] = useState(true); // State for loading

  // Fetch product data on component mount
  useEffect(() => {
    const fetchHeroProduct = async () => {
      try {
        const response = await fetch(
          "http://localhost:5002/api/v1/products/newProduct"
        );
        const data = await response.json();

        // Assuming the API returns an array, use the first product
        if (data && data.length > 0) {
          setHeroProduct(data[0]); // Set the first product in the response
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching hero product:", error);
        setLoading(false);
      }
    };

    fetchHeroProduct();
  }, []);

  if (loading) {
    return (
      <div className="w-full h-[500px] flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!heroProduct) {
    return (
      <div className="w-full h-[500px] flex items-center justify-center">
        No product data available.
      </div>
    );
  }

  return (
    <div className="w-full p-4">
      <div className="w-full h-[500px] relative rounded-xl">
        {/* Hero Image */}
        <img
          src={heroProduct.images[0]?.url || ""}
          alt={heroProduct.name}
          className="w-full h-full object-cover rounded-xl"
        ></img>

        {/* Right Section Text */}
        <div className="w-fit h-fit flex flex-col justify-center items-end text-xl md:text-3xl absolute top-0 right-0">
          <div className="px-4 py-1 relative bg-primary pr-6">
            Bespoke Creations
            <div className="absolute top-0 -left-6">
              <div id="curved-corner-topright"></div>
            </div>
            <div className="absolute bottom-0 -left-6">
              <div id="curved-corner-bottomright"></div>
            </div>
          </div>
          <div className="pl-4 pr-2 py-2 relative rounded-l-xl items-center bg-primary">
            for Discerning Collectors.
            <div className="absolute -bottom-6 right-0">
              <div id="curved-corner-topright"></div>
            </div>
          </div>
        </div>

        {/* Bottom Left Section Text */}
        <div className="absolute w-fit p-2 bottom-0 rounded-t-2xl left-[50px] md:left-[200px] bg-primary">
          <div className="py-1 rounded-xl px-12 bg-secondary-100 text-primary text-xl">
            {heroProduct.name}
          </div>
          <div className="absolute bottom-0 -right-6">
            <div id="curved-corner-bottomleft"></div>
          </div>
          <div className="absolute bottom-0 -left-6">
            <div id="curved-corner-bottomright"></div>
          </div>
        </div>

        {/* Top Right Call-to-Action */}
        <div className="w-full h-full absolute top-0 left-0 bg-transparent p-8 flex justify-end items-center cursor-pointer">
          <div className="border-2 rounded-xl px-6 py-2 w-fit h-fit text-primary md:text-2xl hover:bg-secondary-100-low hover:border-secondary-100">
            New arrivals
          </div>
        </div>
      </div>
    </div>
  );
}
