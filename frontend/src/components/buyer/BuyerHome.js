import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RecentConversations from '../common/RecentConversations';
import LogoutButton from '../auth/LogoutButton';
import { db, auth } from '../../firebase';
import { ref, onValue } from 'firebase/database';
import './BuyerStyles.css'
const BuyerHome = () => {
  const navigate = useNavigate();
  const [materials, setMaterials] = useState([]);

  useEffect(() => {
    const materialRef = ref(db, 'materials/');
    onValue(materialRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const arr = Object.entries(data).map(([id, val]) => ({ id, ...val }));
        setMaterials(arr);
      }
    });
  }, []);

  const handlePlaceOrder = (material) => {
    navigate(`/buyer/place-order/${material.id}`);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Welcome, Buyer 🛒</h2>

      {/* Available Materials Section */}
      <div style={{ margin: '20px 0' }}>
        <h3>Available Materials</h3>
        {materials.map((material) => (
          <div key={material.id} style={{ border: '1px solid gray', padding: '10px', margin: '10px 0' }}>
            <h4>{material.name}</h4>
            <p>{material.description}</p>
            <p>Quantity: {material.quantity}</p>
            <button onClick={() => navigate(`/buyer/chat/${material.seller_id}`)}> Chat with Seller</button>
            <button onClick={() => handlePlaceOrder(material)}> Place Order</button>
          </div>
        ))}
      </div>

      {/* Quick Access Buttons */}
      <div style={{ display: 'flex', gap: '10px', margin: '10px 0' }}>
        <button onClick={() => navigate("/buyer/orders")}> My Orders</button>
      </div>

      <RecentConversations userRole="buyer" />
      <LogoutButton />
    </div>
  );
};

export default BuyerHome;
