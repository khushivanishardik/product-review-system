const Order = require("../models/Order");
const Cart = require("../models/Cart");

// Checkout
exports.placeOrder = async (req, res) => {
  try {
    const cartItems = await Cart.find({
      user: req.user.id,
    }).populate("product");

    if (cartItems.length === 0) {
      return res.status(400).json({
        message: "Cart is empty",
      });
    }

    let total = 0;

    const products = cartItems.map((item) => {
      total += item.product.price * item.quantity;

      return {
        product: item.product._id,
        quantity: item.quantity,
      };
    });

    const order = await Order.create({
      user: req.user.id,
      products,
      totalAmount: total,
    });

    await Cart.deleteMany({
      user: req.user.id,
    });

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Order History
exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      user: req.user.id,
    }).populate("products.product");

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};