import React, { useState } from "react";
import { motion } from "framer-motion";
import ProductCard from "./ProductCard";
import img12 from "../assets/images/img12.png";
import img13 from "../assets/images/img13.png";
import img14 from "../assets/images/img14.png";
import img19 from "../assets/images/img19.png";

const products = [
  {
    image: img12,
    name: "The Windsor Chair",
    price: "$250",
    colSpan: 1,
    rowSpan: 2,
  },
  {
    image: img13,
    name: "The Windsor Drawer .",
    price: "$250",
    colSpan: 1,
    rowSpan: 2,
  },
  {
    image: img14,
    name: "Baroque Empress Couch",
    price: "$250",
    colSpan: 1,
    rowSpan: 2,
  },
  {
    image: img19,
    name: "Legacy Rattan Couch",
    price: "$250",
    colSpan: 2,
    rowSpan: 2,
  },
  {
    image: img13,
    name: "Solace Companion Table",
    price: "$200",
    colSpan: 1,
    rowSpan: 2,
  },
  {
    image: img12,
    name: "Teak 3-Seater Sofa Rattan",
    price: "$400",
    colSpan: 1,
    rowSpan: 2,
  },
  {
    image: img12,
    name: "Teak 3-Seater Sofa Rattan",
    price: "$400",
    colSpan: 2,
    rowSpan: 2,
  },
  {
    image: img12,
    name: "The Windsor Chair",
    price: "$250",
    colSpan: 1,
    rowSpan: 2,
  },
  {
    image: img13,
    name: "The Windsor Drawer",
    price: "$250",
    colSpan: 1,
    rowSpan: 2,
  },
  {
    image: img14,
    name: "Baroque Empress Couch",
    price: "$250",
    colSpan: 1,
    rowSpan: 2,
  },
  {
    image: img19,
    name: "Legacy Rattan Couch",
    price: "$250",
    colSpan: 2,
    rowSpan: 2,
  },
  {
    image: img13,
    name: "Solace Companion Table",
    price: "$200",
    colSpan: 1,
    rowSpan: 2,
  },
  {
    image: img12,
    name: "Teak 3-Seater Sofa Rattan",
    price: "$400",
    colSpan: 1,
    rowSpan: 2,
  },
  {
    image: img12,
    name: "Teak 3-Seater Sofa Rattan",
    price: "$400",
    colSpan: 2,
    rowSpan: 2,
  },
];

const filter = ["New Arrivals", "BedSide Table", "Chair"];

export default function Products() {
  const [currentPage, setCurrentPage] = useState(1);
  // Number of rows per page
  const itemsPerPage = 7; // Since each row has 3 cards, calculate total items per page

  // Calculate the visible products for the current page
  const visibleProducts = products.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Calculate total pages
  const totalPages = Math.ceil(products.length / itemsPerPage);

  return (
    <div className="flex flex-col w-full items-center">
      <div className="flex justify-end gap-3 w-full mb-4">
        <motion.button
          className="px-4 py-2 bg-secondary-200 text-xl tracking-wider font-bold text-secondary-100 rounded-lg shadow-md"
          initial={{ backgroundColor: "#EBE2DB", color: "#523B2F" }}
          whileHover={{ backgroundColor: "#523B2F", color: "#EBE2DB" }}
          transition={{ duration: 0.5 }}
        >
          All
        </motion.button>
        {filter.map((item) => (
          <motion.button
            key={item}
            className="px-4 py-2 bg-secondary-200 text-xl tracking-wider font-bold text-secondary-100 rounded-lg shadow-md mr-4"
            initial={{ backgroundColor: "#EBE2DB", color: "#523B2F" }}
            whileHover={{ backgroundColor: "#523B2F", color: "#EBE2DB" }}
            transition={{ duration: 0.5 }}
          >
            {item}
          </motion.button>
        ))}
      </div>
      <ProductCard products={visibleProducts} />

      {/* Pagination Controls */}
      <div className="w-full pr-4 flex justify-end mt-4 gap-2">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          className="px-4 py-2 bg-secondary-200 text-secondary-100 rounded-lg shadow-md"
          disabled={currentPage === 1}
        >
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-4 py-2 rounded-lg shadow-md ${
              currentPage === i + 1
                ? "bg-secondary-100 text-white"
                : "bg-secondary-200 text-secondary-100"
            }`}
          >
            {i + 1}
          </button>
        ))}
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          className="px-4 py-2 bg-secondary-200 text-secondary-100 rounded-lg shadow-md"
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}
