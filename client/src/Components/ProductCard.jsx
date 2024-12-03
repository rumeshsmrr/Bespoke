import PropTypes from "prop-types";

import { FaPlusCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function ProductCard({ products }) {
  return (
    <div
      className="w-full grid gap-8  p-4"
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gridAutoRows: "150px",
      }}
    >
      {products.map((product, index) => (
        <div
          key={index}
          className="relative  rounded-lg overflow-hidden bg-white"
          style={{
            gridColumn: `span ${product.colSpan}`,
            gridRow: `span ${product.rowSpan}`,
          }}
        >
          {/* Product Image */}
          <Link to={`/product-description/${product._id}`}>
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover cursor-pointer"
            />
          </Link>

          {/* Overlay for Price and Icon */}
          <div className="absolute bottom-0 left-0 right-0 h-fit   bg-secondary-100-low px-4 py-2 flex justify-between items-center">
            {/* Price */}
            <p className="text-white w-4/5  font-semibold text-lg lg:text-xl tracking-widest">
              {product.name}
            </p>

            {/* Icon */}
            <div className="bg-white p-2 w-16 h-16 rounded-tl-2xl absolute right-0 bottom-0 shadow-lg cursor-pointer flex justify-center items-center">
              <div className="bg-secondary-100 w-10 h-10 absolute rounded-md flex items-center justify-center">
                <FaPlusCircle className="text-white text-xl m-auto " />
              </div>
              <div className="absolute -top-6 right-0">
                <div id="curved-corner-bottomright"></div>
              </div>
              <div className="absolute bottom-0 -left-6">
                <div id="curved-corner-bottomright"></div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
ProductCard.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      colSpan: PropTypes.number.isRequired,
      rowSpan: PropTypes.number.isRequired,
    })
  ).isRequired,
};
