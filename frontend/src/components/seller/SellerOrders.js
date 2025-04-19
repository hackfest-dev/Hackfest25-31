import React, { useEffect, useState } from 'react';
import { db } from '../../firebase';
import { ref, onValue, update } from 'firebase/database';

export default function SellerOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const ordersRef = ref(db, 'orders/');
    onValue(ordersRef, (snapshot) => {
      const data = snapshot.val();
      const sellerOrders = [];

      for (let key in data) {
        if (data[key].sellerId === auth.currentUser.uid) {
          sellerOrders.push({ ...data[key], orderId: key });
        }
      }

      setOrders(sellerOrders);
    });
  }, []);

  const handleOrderStatusChange = (orderId, status) => {
    const orderRef = ref(db, `orders/${orderId}`);
    update(orderRef, { status })
      .then(() => {
        if (status === 'accepted') {
          // Notify the delivery personnel (you can create a notification system for them too)
          const deliveryNotificationRef = ref(db, `notifications/delivery`);
          push(deliveryNotificationRef, {
            message: `A new order for delivery is ready for pickup.`,
            orderId: orderId,
            timestamp: Date.now(),
          });
        }
      })
      .catch((err) => {
        console.error("Error changing order status:", err);
      });
  };

  return (
    <div>
      <h2>Your Orders</h2>
      {orders.length > 0 ? (
        orders.map((order) => (
          <div key={order.orderId} style={{ marginBottom: '20px' }}>
            <h4>Material: {order.materialName}</h4>
            <p>Quantity: {order.quantity}</p>
            <p>Status: {order.status}</p>
            <button onClick={() => handleOrderStatusChange(order.orderId, 'accepted')}>Accept Order</button>
            <button onClick={() => handleOrderStatusChange(order.orderId, 'rejected')}>Reject Order</button>
          </div>
        ))
      ) : (
        <p>No orders placed yet.</p>
      )}
    </div>
  );
}
