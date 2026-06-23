import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";

import ReviewCard from "../components/ReviewCard";

function ProductDetails() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);

  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

   const fetchProduct = async () => {
    const res = await api.get(`/products/${id}`);
    setProduct(res.data);
  };

  const fetchReviews = async () => {
    const res = await api.get(`/reviews/${id}`);
    setReviews(res.data);
  };


  useEffect(() => {
    const loadData = async () => {
      await fetchProduct();
      await fetchReviews();
    };

    loadData();
  }, [id]);


  const addToCart = async () => {
    try {
      await api.post("/cart", {
        productId: id,
        quantity: 1,
      });

      alert("Added To Cart");
    } catch {
      alert("Login Required");
    }
  };

  const submitReview = async () => {
    try {
      await api.post("/reviews", {
        productId: id,
        rating,
        comment,
      });

      alert("Review Added");

      setComment("");
      fetchReviews();
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Unable To Add Review"
      );
    }
  };



  if (!product) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="container py-5">

      <div className="product-detail">

        <img
          src={product.image}
          alt={product.name}
          className="detail-image"
        />

        <div>

          <h1>{product.name}</h1>

          <h3 className="price">
            ₹ {product.price}
          </h3>

          <p>{product.description}</p>

          <button
            className="cart-btn"
            onClick={addToCart}
          >
            Add To Cart
          </button>

        </div>

      </div>

      <hr />

      <h2>Customer Reviews</h2>

     {reviews.length === 0 ? (
  <p>No Reviews Yet</p>
) : (
  reviews.map((review) => (
    <ReviewCard
      key={review._id}
      review={review}
    />
  ))
)}

      <hr />

      <h2>Write Review</h2>

      <div className="star-rating">

  {[1,2,3,4,5].map((star) => (
    <span
      key={star}
      className={
        star <= rating
          ? "star active"
          : "star"
      }
      onClick={() => setRating(star)}
    >
      ★
    </span>
  ))}

</div>

     <textarea
  className="review-input"
  placeholder="Write Review"
  value={comment}
  onChange={(e) => setComment(e.target.value)}
/>
  

      <button
        className="review-btn"
        onClick={submitReview}
      >
        Submit Review
      </button>

    </div>
  );
}

export default ProductDetails;