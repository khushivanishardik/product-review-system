const Review = require("../models/Review");
const Order = require("../models/Order");

// Add Review
exports.addReview = async (req, res) => {
  try {
    const { productId, rating, comment } = req.body;

    const purchased = await Order.findOne({
      user: req.user.id,
      "products.product": productId,
    });

    if (!purchased) {
      return res.status(400).json({
        message: "Purchase product before reviewing",
      });
    }

    const existingReview = await Review.findOne({
      user: req.user.id,
      product: productId,
    });

    if (existingReview) {
      return res.status(400).json({
        message: "Review already exists",
      });
    }

    const review = await Review.create({
      user: req.user.id,
      product: productId,
      rating,
      comment,
    });

    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get Reviews
exports.getReviews = async (req, res) => {
  try {
    const reviews = await Review.find({
      product: req.params.productId,
    }).populate("user", "name");

    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete Review
exports.deleteReview = async (req, res) => {
  try {
    await Review.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Review deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};