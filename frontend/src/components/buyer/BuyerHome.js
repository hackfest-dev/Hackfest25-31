import React from 'react';
import LogoutButton from '../auth/LogoutButton'; 

const BuyerHome = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Welcome Buyer!</h1>
      <p>Search and explore industrial materials, connect with sellers, and track your shipments.</p>
      <LogoutButton />
    </div>
  );
};

export default BuyerHome;
