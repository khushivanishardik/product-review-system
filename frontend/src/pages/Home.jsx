import { useEffect, useState } from "react";
import api from "../services/api";

function Home() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get("/products");
        setProducts(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
      <section className="hero">
        <h1>Discover Trusted Product Reviews</h1>

        <p>
          Compare products, read reviews and make
          smarter buying decisions.
        </p>
      </section>

      <div className="container">
        <h2 className="section-title">
          Featured Products
        </h2>

        <div className="search-container">
  <input
    type="text"
    placeholder="🔍 Search products..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    className="search-input"
  />
</div> 

        <div className="product-grid">
          {products
  .filter((product) =>
    product.name
      .toLowerCase()
      .includes(search.toLowerCase())
  )
  .map((product) =>  (
            <div className="product-card" key={product._id}>
              <img
                src={product.image}
                alt={product.name}
              />

              <div className="product-content">
                <h3>{product.name}</h3>

                <div className="stars">
                  ⭐⭐⭐⭐⭐
                </div>

                <p>{product.description}</p>

                <h4>₹ {product.price}</h4>

                <a
                    href={`/product/${product._id}`}
                   className="view-btn"
                >
  View Reviews
</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Home;