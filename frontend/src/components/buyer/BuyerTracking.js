import React, { useEffect, useState } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase';

// Add the status from Firestore to BuyerTracking.js
const BuyerTracking = ({ orderId }) => {
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const orderRef = doc(db, 'orders', orderId); // Reference to Firestore order
    const unsub = onSnapshot(orderRef, (snapshot) => {
      if (snapshot.exists()) {
        setOrder(snapshot.data());
      }
    });

    return () => unsub();
  }, [orderId]);

  if (!order) return <p>Loading...</p>;

  return (
    <div>
      <h2>Tracking Order #{orderId}</h2>
      <p>Status: {order.status}</p>
    </div>
  );
};

export default BuyerTracking;
