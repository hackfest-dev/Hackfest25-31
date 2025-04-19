import React, { useEffect, useState } from 'react';
import { db, auth } from '../../firebase';
import { ref, onValue } from 'firebase/database';
import './DeliveryStyles.css';

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
    <div className="delivery-home-container">
      <h2 className="welcome-heading">Welcome, Delivery Agent</h2>

      {/* Assigned Deliveries */}
      <div className="assigned-deliveries-container">
        <h3 className="section-heading">Assigned Deliveries</h3>
        {assignedDeliveries.length === 0 ? (
          <p className="no-deliveries">No deliveries assigned yet!</p>
        ) : (
          assignedDeliveries.map((delivery) => (
            <div key={delivery.id} className="delivery-card">
              <h4 className="delivery-title">Material: {delivery.material_name}</h4>
              <p className="delivery-info">Quantity: {delivery.quantity}</p>
              <p className="delivery-info">Status: {delivery.status}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default DeliveryHome;
