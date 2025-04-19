import React from 'react';
import LogoutButton from '../auth/LogoutButton'; 

const SellerHome = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Welcome Seller!</h1>
      <p>Search and explore industrial materials, connect with buyers, and track your shipments.</p>
      <LogoutButton />
    </div>
  );
};

export default SellerHome;
