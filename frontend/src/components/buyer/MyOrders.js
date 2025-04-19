import React, { useEffect, useState } from 'react';
import { db, auth } from '../../firebase';
import { ref, onValue } from 'firebase/database';
import { useNavigate } from 'react-router-dom';
import './BuyerStyles.css'
export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    const orderRef = ref(db, 'deliveries/');
    onValue(orderRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const userOrders = Object.entries(data)
          .map(([id, val]) => ({ id, ...val }))
          .filter(order => order.buyer_id === user.uid);
        setOrders(userOrders);
      }
    });
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h2>📦 My Orders (Buyer)</h2>
      {orders.map((order, idx) => (
        <div key={idx} style={{ border: '1px solid #aaa', margin: '10px 0', padding: '10px' }}>
          <p><b>Material:</b> {order.material_name}</p>
          <p><b>Status:</b> {order.status}</p>
          <button onClick={() => navigate(`/buyer/chat/${order.seller_id}`)}>💬 Chat with Seller</button>
          <button onClick={() => navigate(`/buyer/chat/${order.delivery_id}`)}>🚚 Chat with Delivery</button>
        </div>
      ))}
    </div>
  );
}
