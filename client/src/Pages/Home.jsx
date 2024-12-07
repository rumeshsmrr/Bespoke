import React from "react";
import { Link } from "react-router-dom";
import HomePageProducts from "../Components/HomePageProducts";
import Hero from "../Components/Hero";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-primary">
      <Hero />
      <HomePageProducts />
    </div>
  );
};

export default Home;
