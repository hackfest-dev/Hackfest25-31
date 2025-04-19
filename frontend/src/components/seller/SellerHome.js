import React from 'react';
import LogoutButton from '../auth/LogoutButton';
import { useNavigate } from 'react-router-dom';
import './SellerStyles.css';

const SellerHome = () => {
  const navigate = useNavigate();

  return (
    <div className="seller-home">
      <h2 className="welcome-heading">Welcome, Seller</h2>

      <div className="action-buttons">
        <button className="action-button" onClick={() => navigate('/seller/materials')}>
          My Materials
        </button>
        <button className="action-button" onClick={() => navigate('/seller/orders')}>
          Orders Received
        </button>
        <button className="action-button" onClick={() => navigate('/seller/chat')}>
          Chat
        </button>
      </div>

      <div className="logout-button">
        <LogoutButton />
      </div>
    </div>
  );
};

export default SellerHome;
