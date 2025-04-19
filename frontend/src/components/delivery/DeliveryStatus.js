import React, { useState } from 'react';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase'; // path may differ

const DeliveryStatus = ({ orderId }) => {
  const [status, setStatus] = useState('');
  const [error, setError] = useState(null);

// DeliveryStatus.js

const updateStatus = async () => {
    if (!status) {
      setError('Please select a status');
      return;
    }
  
    try {
      const orderRef = doc(db, 'orders', orderId); // Firestore reference to order
      
      // Update order status in Firestore
      await updateDoc(orderRef, { status });
  
      // Optionally, notify the buyer about the status change (e.g., via a messaging system)
      alert('Status updated!');
    } catch (err) {
      console.error(err);
      setError('Failed to update');
    }
  };
  

  return (
    <div>
      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="">Select</option>
        <option value="Picked up">Picked up</option>
        <option value="In Transit">In Transit</option>
        <option value="Delivered">Delivered</option>
      </select>
      <button onClick={updateStatus}>Update Status</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default DeliveryStatus;
