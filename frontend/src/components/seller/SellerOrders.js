import React, { useEffect, useState } from 'react';
import { db, auth } from '../../firebase';
import { ref, onValue, update, push } from 'firebase/database';
import './SellerStyles.css'
export default function SellerOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const ordersRef = ref(db, 'deliveries'); // use 'deliveries' as per your order placing logic

    onValue(ordersRef, (snapshot) => {
      const data = snapshot.val();
      const sellerOrders = [];

      for (let key in data) {
        if (data[key].seller_id === auth.currentUser.uid) {
          sellerOrders.push({ ...data[key], orderId: key });
        }
      }

      setOrders(sellerOrders);
    });
  }, []);

  const handleOrderStatusChange = (orderId, status) => {
    const orderRef = ref(db, `deliveries/${orderId}`);
    const updates = { status };
  
    if (status === 'accepted') {
      const deliveryAgentUID = 'r3uWifAbUPMCnJk8xWXdw2DdbU13'; // ✅ Your delivery agent's UID
      updates.delivery_id = deliveryAgentUID;
  
      const deliveryNotificationRef = ref(db, 'notifications/delivery');
      push(deliveryNotificationRef, {
        message: `A new order is ready for pickup.`,
        orderId,
        delivery_id: deliveryAgentUID,
        timestamp: Date.now(),
      });
    }
  
    update(orderRef, updates)
      .then(() => console.log('Order updated successfully'))
      .catch((err) => console.error('Error changing order status:', err));
  };
  

  return (
    <div style={{ padding: '20px' }}>
      <h2>Your Orders</h2>
      {orders.length > 0 ? (
        orders.map((order) => (
          <div key={order.orderId} style={{ marginBottom: '20px', padding: '10px', border: '1px solid #ccc', borderRadius: '8px' }}>
            <h4>Material: {order.material_name}</h4>
            <p>Quantity: {order.quantity}</p>
            <p>Status: <strong>{order.status}</strong></p>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={() => handleOrderStatusChange(order.orderId, 'accepted')}>Accept</button>
              <button onClick={() => handleOrderStatusChange(order.orderId, 'rejected')}>Reject</button>
            </div>
          </div>
        ))
      ) : (
        <p>No orders received yet.</p>
      )}
    </div>
  );
}
