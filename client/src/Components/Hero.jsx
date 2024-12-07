import React from "react";
import heroImage from "../assets/images/img18.jpg";

export default function Hero() {
  return (
    <div className=" w-full p-4">
      <div className="w-full h-[500px] relative  rounded-xl">
        <img
          src={heroImage}
          alt="hero"
          className="w-full h-full object-cover rounded-xl"
        ></img>
        <div className="w-fit h-fit  flex flex-col justify-center items-end text-xl md:text-3xl absolute top-0 right-0">
          <div className="px-4 py-1 relative  bg-primary pr-6">
            Bespoke Creations
            <div className="absolute top-0 -left-6 ">
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
        <div className="absolute w-fit p-2 bottom-0 rounded-t-2xl left-[50px] md:left-[200px]  bg-primary">
          <div className="py-1 rounded-xl px-12 bg-secondary-100 text-primary text-xl">
            Rattan Couches
          </div>
          <div className="absolute bottom-0 -right-6">
            <div id="curved-corner-bottomleft"></div>
          </div>
          <div className="absolute bottom-0 -left-6">
            <div id="curved-corner-bottomright"></div>
          </div>
        </div>
        <div className="w-full h-full absolute top-0 left-0 bg-transparent p-8 flex justify-end items-center cursor-pointer">
          <div className=" border-2 rounded-xl px-6 py-2 w-fit h-fit text-primary md:text-2xl  hover:bg-secondary-100-low hover:border-secondary-100">
            New Arrivals
          </div>
        </div>
      </div>
    </div>
  );
}
