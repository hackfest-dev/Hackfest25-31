import React from 'react';
import LogoutButton from '../auth/LogoutButton';
import { useNavigate } from 'react-router-dom';

const SellerHome = () => {
  const navigate = useNavigate();

  return (
    <div style={{ padding: '20px' }}>
      <h2>Welcome, Seller </h2>

      <div style={{ marginTop: '20px' }}>
        <button onClick={() => navigate('/seller/materials')}> My Materials</button>
        <button onClick={() => navigate('/seller/orders')}> Orders Received</button>
        <button onClick={() => navigate('/seller/chat')}>💬Chat</button>
      </div>

      <div style={{ marginTop: '20px' }}>
        <LogoutButton />
      </div>
    </div>
  );
};

export default SellerHome;
