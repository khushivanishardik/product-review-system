const Cart = require("../models/Cart");

// Add To Cart
exports.addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    const cartItem = await Cart.create({
      user: req.user.id,
      product: productId,
      quantity,
    });

    res.status(201).json(cartItem);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get Cart
exports.getCart = async (req, res) => {
  try {
    const cartItems = await Cart.find({
      user: req.user.id,
    }).populate("product");

    res.status(200).json(cartItems);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Remove Item
exports.removeCartItem = async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Item removed from cart",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};