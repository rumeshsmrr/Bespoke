const express = require("express");
const {
  addToCart,
  getCart,
  removeFromCart,
  clearCart,
} = require("../Ctrls/CartCtrl");

const router = express.Router();

router.post("/add", addToCart); // Add item to cart
router.get("/:userId", getCart); // Get user's cart
router.post("/remove", removeFromCart); // Remove item from cart
router.post("/clear", clearCart); // Clear cart

module.exports = router;
