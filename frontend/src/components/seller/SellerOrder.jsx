import React, { useEffect, useState } from 'react';
import { db, auth } from '../../firebase';
import { ref, onValue } from 'firebase/database';
import { onAuthStateChanged } from 'firebase/auth';
import './SellerStyles.css'
export default function SellerOrders() {
  const [orders, setOrders] = useState([]);
  const [sellerUID, setSellerUID] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) setSellerUID(user.uid);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const ordersRef = ref(db, 'orders/');
    onValue(ordersRef, (snapshot) => {
      const data = snapshot.val();
      if (data && sellerUID) {
        const sellerOrders = Object.entries(data)
          .filter(([id, order]) => order.sellerId === sellerUID)
          .map(([id, order]) => ({ id, ...order }));
        setOrders(sellerOrders);
      }
    });
  }, [sellerUID]);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Your Incoming Orders</h2>
      {orders.length > 0 ? (
        orders.map((order) => (
          <div key={order.id} style={{ border: '1px solid #aaa', margin: '10px', padding: '10px' }}>
            <p><strong>Material:</strong> {order.materialName}</p>
            <p><strong>Quantity:</strong> {order.quantity}</p>
            <p><strong>Status:</strong> {order.status}</p>
            <p><strong>Buyer ID:</strong> {order.buyerId}</p>
          </div>
        ))
      ) : (
        <p>No orders for you yet.</p>
      )}
    </div>
  );
}
