import React from "react";
import {
  FaTh,
  FaClipboardList,
  FaBoxOpen,
  FaUser,
  FaBell,
} from "react-icons/fa";

import img from "../../assets/images/artisan-Black.png";
import avatar from "../../assets/images/ehu.jpg";
import { Link } from "react-router-dom";

export default function AdminNav() {
  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-primary text-secondary-100">
      {/* Logo */}
      <div className="flex items-center">
        <img src={img} alt="Logo" className="w-20 h-auto" />
      </div>

      {/* Navigation Links */}
      <div className="flex space-x-4">
        <button className="flex items-center gap-2 px-4 py-2 border-2 border-secondary-100 rounded-full hover:bg-secondary-100 hover:text-primary transition">
          <FaTh />
          Dashboard
        </button>
        <Link to={"/adminInventory"}>
          <button className="flex items-center gap-2 px-4 py-2 border-2 border-secondary-100 rounded-full hover:bg-secondary-100 hover:text-primary transition">
            <FaClipboardList />
            Inventory
          </button>
        </Link>
        <Link to={"/adminProduct"}>
          <button className="flex items-center gap-2 px-4 py-2 border-2 border-secondary-100 rounded-full hover:bg-secondary-100 hover:text-primary transition">
            <FaBoxOpen />
            Product
          </button>
        </Link>
        <button className="flex items-center gap-2 px-4 py-2 border-2 border-secondary-100 rounded-full hover:bg-secondary-100 hover:text-primary transition">
          <FaUser />
          Profile
        </button>
      </div>

      {/* Notifications and User Profile */}
      <div className="flex items-center space-x-4">
        {/* Notification Icon */}
        <div className="relative">
          <button className="flex items-center justify-center w-10 h-10 bg-secondary-100 text-primary rounded-full">
            <FaBell />
          </button>
          <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full"></span>
        </div>

        {/* User Avatar */}
        <img
          src={avatar}
          alt="User Avatar"
          className="w-10 h-10 rounded-full border-2 border-secondary-100"
        />
      </div>
    </nav>
  );
}
