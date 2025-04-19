import React, { useState, useEffect } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase'; // adjust path as needed
import DeliveryMap from '../delivery/DeliveryMap';
import DeliveryStatus from '../delivery/DeliveryStatus'; // ✅ import here

// DeliveryTracker.js with delivery map and status updates
const DeliveryTracker = ({ orderId }) => {
  const [orderData, setOrderData] = useState(null);

  useEffect(() => {
    const orderRef = doc(db, 'orders', orderId);
    const unsubscribe = onSnapshot(orderRef, (snapshot) => {
      if (snapshot.exists()) {
        setOrderData(snapshot.data());
      }
    });

    return () => unsubscribe();
  }, [orderId]);

  return (
    <div>
      <h3>Delivery Tracker</h3>

      {orderData && orderData.status === 'In Transit' && (
        <DeliveryMap lat={orderData.latitude} lng={orderData.longitude} />
      )}

      {orderData && (
        <div>
          <h4>Order Number: {orderData.orderNumber}</h4>
          <p>Status: {orderData.status}</p>
        </div>
      )}

      {/* DeliveryStatus allows the agent to change order status */}
      <DeliveryStatus orderId={orderId} />
    </div>
  );
};

export default DeliveryTracker;
