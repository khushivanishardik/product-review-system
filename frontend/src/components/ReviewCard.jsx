function ReviewCard({ review }) {
  return (
    <div className="review-card">
      <div className="review-header">

        <div className="review-stars">
          {"★".repeat(review.rating)}
          {"☆".repeat(5 - review.rating)}
        </div>

        <div className="review-user">
          {review.user?.name || "Anonymous User"}
        </div>

      </div>

      <p className="review-comment">
        {review.comment}
      </p>

      <small className="review-date">
        {new Date(review.createdAt).toLocaleDateString()}
      </small>
    </div>
  );
}

export default ReviewCard;