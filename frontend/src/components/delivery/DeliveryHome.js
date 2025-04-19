import React, { useEffect, useState } from 'react';
import { db, auth } from '../../firebase';
import { ref, onValue } from 'firebase/database';
import DeliveryNav from './DeliveryNav'; 
import RecentConversations from '../common/RecentConversations'; 

const DeliveryHome = () => {
  const [assignedDeliveries, setAssignedDeliveries] = useState([]);

  useEffect(() => {
    const deliveriesRef = ref(db, 'deliveries/');
    onValue(deliveriesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const arr = Object.entries(data).map(([id, val]) => ({ id, ...val }));
        const deliveriesForAgent = arr.filter(delivery => delivery.delivery_id === auth.currentUser?.uid);
        setAssignedDeliveries(deliveriesForAgent);
      }
    });
  }, []);

  return (
    <div>
      {/*  NAVIGATION BAR INCLUDED HERE */}
      <DeliveryNav />

      <div style={{ padding: '20px' }}>
        <h2>Welcome, Delivery Agent</h2>

        <div style={{ margin: '20px 0' }}>
          <h3>Assigned Deliveries</h3>
          {assignedDeliveries.length === 0 ? (
            <p>No deliveries assigned yet!</p>
          ) : (
            assignedDeliveries.map((delivery) => (
              <div key={delivery.id} style={{ border: '1px solid gray', padding: '10px', margin: '10px 0' }}>
                <h4>Material: {delivery.material_name}</h4>
                <p>Quantity: {delivery.quantity}</p>
                <p>Status: {delivery.status}</p>
              </div>
            ))
          )}
        </div>

        <RecentConversations userRole="delivery" />
      </div>
    </div>
  );
};

export default DeliveryHome;
