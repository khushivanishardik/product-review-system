import { Link } from "react-router-dom";

function ProductCard({ product }) {
  return (
    <div className="card shadow-lg h-100">

      <img
        src={product.image}
        alt={product.name}
        className="card-img-top product-image"
      />

      <div className="card-body">

        <h4>{product.name}</h4>

        <div className="rating">
          ⭐?
        </div>

        <p className="mt-2">
          {product.description}
        </p>

        <h5 className="price">
          ₹ {product.price}
        </h5>

        <Link
          to={`/product/${product._id}`}
          className="btn btn-primary w-100 mt-3"
        >
          View Details
        </Link>

      </div>

    </div>
  );
}

export default ProductCard;