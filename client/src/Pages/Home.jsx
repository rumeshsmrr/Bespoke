import React from "react";
import { Link } from "react-router-dom";
import HomePageProducts from "../Components/HomePageProducts";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-primary">
      <HomePageProducts />
    </div>
  );
};

export default Home;
