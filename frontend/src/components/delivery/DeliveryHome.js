import React, { useEffect, useState } from 'react';
import { db, auth } from '../../firebase';
import { ref, onValue, update } from 'firebase/database';
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

  const handleStatusChange = (deliveryId, newStatus) => {
    const deliveryRef = ref(db, `deliveries/${deliveryId}`);
    update(deliveryRef, { status: newStatus })
      .then(() => {
        console.log('Status updated');
      })
      .catch((err) => {
        console.error('Error updating status:', err);
      });
  };

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
            <div
              key={delivery.id}
              className="delivery-card"
              style={{
                backgroundColor: delivery.status === 'delivered' ? '#d4edda' : '#f8d7da',
                border: '1px solid #ccc',
                borderRadius: '8px',
                padding: '12px',
                marginBottom: '20px',
              }}
            >
              <h4 className="delivery-title">Material: {delivery.material_name}</h4>
              <p className="delivery-info">Quantity: {delivery.quantity}</p>
              <p className="delivery-info">Status: <strong>{delivery.status}</strong></p>

              <div style={{ display: 'flex', gap: '10px' }}>
                {delivery.status !== 'delivered' && (
                  <button onClick={() => handleStatusChange(delivery.id, 'delivered')}>
                    Mark as Delivered
                  </button>
                )}
                <button onClick={() => handleStatusChange(delivery.id, 'in transit')}>
                  In Transit
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default DeliveryHome;
