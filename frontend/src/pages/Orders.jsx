import { useEffect, useState } from "react";
import api from "../services/api";

function Orders() {
  const [orders, setOrders] = useState([]);

  

  const fetchOrders = async () => {
    try {
      const res = await api.get("/orders");
      setOrders(res.data);
    } catch (error) {
      console.log(error);
    }
  };

useEffect(() => {
  const loadOrders = async () => {
    await fetchOrders();
  };

  loadOrders();
}, []);

  return (
    <div className="container py-5">

      <h1>My Orders</h1>

      {orders.map((order) => (
        <div
          key={order._id}
          className="order-card"
        >
          <h4>
            Order #{order._id.slice(-6)}
          </h4>

          <p>
            Amount:
            ₹ {order.totalAmount}
          </p>

          <p>
            Status:
            <span className="status">
              {order.status}
            </span>
          </p>
        </div>
      ))}

    </div>
  );
}

export default Orders;