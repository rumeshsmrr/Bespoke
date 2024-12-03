import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">Home</h1>
      <Link to="/product-list">
        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">
          Go to Product List
        </button>
      </Link>
    </div>
  );
};

export default Home;
