import { useEffect, useState } from "react";
import api from "../services/api";
import "./Orders.css";

function Orders() {
  const [orders, setOrders] = useState([]);

  const fetchOrders = () => {
    api.get("/api/orders")
      .then((response) => setOrders(response.data))
      .catch((error) => console.error("Error fetching orders:", error));
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="orders-wrapper">
      <div className="orders-actions">
        <button onClick={fetchOrders}>Refresh Orders</button>
      </div>

      {orders.length === 0 ? (
        <p className="orders-message">No orders available.</p>
      ) : (
        <div className="orders-grid">
          {orders.map((order) => (
            <div className="order-card" key={order.id}>
              <div className="order-header">
                <h3>Order #{order.id}</h3>
                <span>{order.orderStatus}</span>
              </div>

              <p><strong>Customer:</strong> {order.user?.fullName || order.user?.name}</p>
              <p><strong>Email:</strong> {order.user?.email}</p>
              <p><strong>Total:</strong> ₹{order.totalAmount}</p>

              <div className="order-items">
                <h4>Items</h4>
                {order.orderItems?.map((item) => (
                  <div className="order-item" key={item.id}>
                    <span>{item.menuItem?.name}</span>
                    <span>Qty: {item.quantity}</span>
                    <span>₹{item.price}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Orders;
