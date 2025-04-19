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
    update(deliveryRef, {
      status: newStatus,
      last_updated: Date.now(),
    })
      .then(() => {
        console.log('Status updated to', newStatus);
      })
      .catch((err) => {
        console.error('Error updating status:', err);
      });
  };

  const formatTimestamp = (timestamp) => {
    if (!timestamp) return 'N/A';
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered':
        return '#d4edda'; // Green
      case 'in transit':
        return '#fff3cd'; // Yellow
      case 'failed':
        return '#f8d7da'; // Red
      default:
        return '#f1f1f1'; // Neutral gray for pending
    }
  };

  return (
    <div className="delivery-home-container">
      <h2 className="welcome-heading">Welcome, Delivery Agent</h2>

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
                backgroundColor: getStatusColor(delivery.status),
                border: '1px solid #ccc',
                borderRadius: '8px',
                padding: '12px',
                marginBottom: '20px',
              }}
            >
              <h4 className="delivery-title">Material: {delivery.material_name}</h4>
              <p className="delivery-info">Quantity: {delivery.quantity}</p>
              <p className="delivery-info">Status: <strong>{delivery.status}</strong></p>
              <p className="delivery-info">Last Updated: {formatTimestamp(delivery.last_updated)}</p>

              <select
                value={delivery.status}
                onChange={(e) => handleStatusChange(delivery.id, e.target.value)}
                style={{ padding: '5px', marginTop: '10px' }}
              >
                <option value="pending">Pending</option>
                <option value="in transit">In Transit</option>
                <option value="delivered">Delivered</option>
                <option value="failed">Failed</option>
              </select>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default DeliveryHome;
