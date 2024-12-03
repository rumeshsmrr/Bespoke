import React, { useEffect, useState } from "react";

export default function CartPage() {
  const [cart, setCart] = useState(null); // Cart data
  const [loading, setLoading] = useState(true); // Loading state

  // Fetch cart data
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await fetch(
          "http://localhost:5002/api/v1/cart/64c1e13e59f08b002c8e4b5a"
        );
        const data = await response.json();
        setCart(data.cart);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching cart data:", error);
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    );
  }

  if (!cart) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        No items in the cart.
      </div>
    );
  }

  return (
    <div className="w-full p-8 ">
      <div className="w-full flex justify-center gap-5 items-start">
        {/* Cart Items */}

        <div className="flex flex-col text-lg gap-4 md:w-2/3">
          <div className="flex justify-between  border py-2 px-4 border-secondary-100 rounded-xl">
            <p className="text-lg font-bold flex-1">Product</p>
            <p className="text-lg font-bold w-24 text-center">Price</p>
            <p className="text-lg font-bold w-24 text-center">Quantity</p>
            <p className="text-lg font-bold w-24 text-right">Total</p>
          </div>
          {cart.items.map((item) => (
            <div
              key={item._id}
              className="flex items-center justify-between border-b py-2 px-4"
            >
              {/* Product Details */}
              <div className="flex items-center flex-1">
                <img
                  src={item.product.images[0]?.url || ""}
                  alt={item.product.name}
                  className="w-20 h-20 md:w-32 md:h-32 object-cover rounded-lg mr-4"
                />
                <span>{item.product.name}</span>
              </div>

              {/* Price */}
              <div className="w-24 text-center">${item.product.price}</div>

              {/* Quantity */}
              <div className="w-24 text-center">{item.quantity}</div>

              {/* Total */}
              <div className="w-24 text-right">
                ${item.product.price * item.quantity}
              </div>
            </div>
          ))}
        </div>

        {/* Cart Summary */}
        <div className="md:w-1/3  bg-secondary-200 p-6 rounded-xl">
          <h2 className="text-lg font-semibold mb-2">
            You have {cart.items.length} items in your cart
          </h2>
          <div className="text-2xl font-bold">${cart.totalPrice}</div>
          <p className="text-sm text-gray-500 mt-2">
            🚚 Next day shipping on all local orders
          </p>
          <textarea
            className="w-full mt-4 p-2 border border-secondary-200 rounded-lg"
            placeholder="Add a note to your order"
            rows={4}
          ></textarea>
          <button className="mt-4 px-6 py-2 bg-secondary-100 text-white rounded-lg hover:bg-primary hover:text-secondary-100">
            Checkout
          </button>
        </div>
      </div>
      {/* Footer Message */}
      <div className="w-full text-center mt-8">
        <p className="text-gray-500 text-xl md:text-4xl font-bold">
          From our hands to your home, we ensure every bespoke piece is
          delivered with <br />
          the same care it was created with.
        </p>
      </div>
    </div>
  );
}
