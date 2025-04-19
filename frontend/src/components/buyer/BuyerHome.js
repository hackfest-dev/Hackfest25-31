import React from 'react';
<<<<<<< Updated upstream
import LogoutButton from '../auth/LogoutButton'; 
=======
import RecentConversations from '../common/RecentConversations';
>>>>>>> Stashed changes

const BuyerHome = () => {
  return (
    <div style={{ padding: '20px' }}>
<<<<<<< Updated upstream
      <h1>Welcome Buyer!</h1>
      <p>Search and explore industrial materials, connect with sellers, and track your shipments.</p>
      <LogoutButton />
=======
      <h2>Welcome, Buyer 🛒</h2>
      <RecentConversations userRole="buyer" />
>>>>>>> Stashed changes
    </div>
  );
};

export default BuyerHome;
