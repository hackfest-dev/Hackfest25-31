import React from 'react';
import LogoutButton from '../auth/LogoutButton'; 

const DeliveryHome = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Welcome Delivery agent!</h1>
      <p>Search and explore industrial materials, connect with sellers, and track your shipments.</p>
      <LogoutButton />
    </div>
  );
};

export default DeliveryHome;
