import React, { useEffect, useState } from 'react';
import { db, auth } from '../../firebase';
import { ref, onValue, update } from 'firebase/database';

export default function DeliveryList() {
  const [deliveries, setDeliveries] = useState([]);

  useEffect(() => {
    const deliveriesRef = ref(db, 'deliveries/');
    onValue(deliveriesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const arr = Object.entries(data).map(([id, val]) => ({ id, ...val }));
        setDeliveries(arr);
      }
    });
  }, []);

  const handleStatusChange = (id, status) => {
    const deliveryRef = ref(db, `deliveries/${id}`);
    update(deliveryRef, {
      status,
      assigned_to: auth.currentUser?.uid || null
    });
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2> Shipment Requests</h2>
      {deliveries.map((item, idx) => (
        <div key={idx} style={{ border: '1px solid gray', padding: '10px', margin: '10px 0' }}>
          <h4>{item.material_name}</h4>
          <p>Status: {item.status}</p>

          {item.status === 'pending' && (  
            <>
              <button onClick={() => handleStatusChange(item.id, 'accepted')}>Accept</button>
              <button onClick={() => handleStatusChange(item.id, 'rejected')}>Reject</button>
            </>
          )}

          {item.status === 'accepted' && item.assigned_to === auth.currentUser?.uid && (
            <>
              <button onClick={() => handleStatusChange(item.id, 'in transit')}>Mark In Transit</button>
              <button onClick={() => handleStatusChange(item.id, 'delivered')}>Mark Delivered</button>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
