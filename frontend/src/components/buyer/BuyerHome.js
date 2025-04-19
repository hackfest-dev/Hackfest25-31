import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RecentConversations from '../common/RecentConversations';
import LogoutButton from '../auth/LogoutButton';
import { db } from '../../firebase';
import { ref, onValue } from 'firebase/database';
import './BuyerStyles.css';

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
    <div className="buyer-home-container">
      <h2 className="buyer-home-title">Welcome, Buyer</h2>

      {/* Available Materials Section */}
      <div className="material-section">
        <h3 className="section-heading">Available Materials</h3>
        {materials.map((material) => (
          <div key={material.id} className="material-card">
            <h4>{material.name}</h4>
            <p>{material.description}</p>
            <p>Quantity: {material.quantity}</p>
            <div className="material-btn-group">
              <button
                className="btn secondary"
                onClick={() => navigate(`/buyer/chat/${material.seller_id}`)}
              >
                Chat with Seller
              </button>
              <button
                className="btn primary"
                onClick={() => handlePlaceOrder(material)}
              >
                Place Order
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Access Buttons */}
      <div className="quick-actions">
        <button className="btn tertiary" onClick={() => navigate("/buyer/orders")}>
          My Orders
        </button>
      </div>

      <RecentConversations userRole="buyer" />
      <LogoutButton />
    </div>
  );
};

export default BuyerHome;
