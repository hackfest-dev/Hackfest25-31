import React from 'react';
<<<<<<< Updated upstream
import LogoutButton from '../auth/LogoutButton'; 
=======
import RecentConversations from '../common/RecentConversations';
>>>>>>> Stashed changes

const SellerHome = () => {
  return (
    <div style={{ padding: '20px' }}>
<<<<<<< Updated upstream
      <h1>Welcome Seller!</h1>
      <p>Search and explore industrial materials, connect with buyers, and track your shipments.</p>
      <LogoutButton />
=======
      <h2>Welcome, Seller </h2>
      <RecentConversations userRole="seller" />
>>>>>>> Stashed changes
    </div>
  );
};

export default SellerHome;
