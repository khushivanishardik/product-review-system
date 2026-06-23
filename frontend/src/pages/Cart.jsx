import { useEffect, useState } from "react";
import api from "../services/api";

function Cart() {
  const [cartItems, setCartItems] = useState([]);

 
  const fetchCart = async () => {
    try {
      const res = await api.get("/cart");
      setCartItems(res.data);
    } catch (error) {
      console.log(error);
    }
  };

   useEffect(() => {
  const loadCart = async () => {
    await fetchCart();
  };

  loadCart();
}, []);


  const removeItem = async (id) => {
    try {
      await api.delete(`/cart/${id}`);

      fetchCart();
    } catch (error) {
      console.log(error);
    }
  };

  const placeOrder = async () => {
    try {
      await api.post("/orders");

      alert("Order Placed");

      fetchCart();
    } catch (error) {
      console.log(error);
    }
  };

  const total = cartItems.reduce(
    (sum, item) =>
      sum + item.product.price * item.quantity,
    0
  );

  return (
    <div className="container py-5">

      <h1>My Cart</h1>

      {cartItems.map((item) => (
        <div
          key={item._id}
          className="cart-card"
        >
          <h4>{item.product.name}</h4>

          <p>
            ₹ {item.product.price}
          </p>

          <p>
            Quantity: {item.quantity}
          </p>

          <button
            className="remove-btn"
            onClick={() =>
              removeItem(item._id)
            }
          >
            Remove
          </button>
        </div>
      ))}

      <h2>
        Total: ₹ {total}
      </h2>

      {cartItems.length > 0 && (
        <button
          className="order-btn"
          onClick={placeOrder}
        >
          Place Order
        </button>
      )}

    </div>
  );
}

export default Cart;