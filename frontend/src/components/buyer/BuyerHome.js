import React from 'react';
import RecentConversations from '../common/RecentConversations';
import LogoutButton from '../auth/LogoutButton';

const BuyerHome = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h2>Welcome, Buyer 🛒</h2>
      <RecentConversations userRole="buyer" />
      <LogoutButton/>
    </div>
  );
};

export default BuyerHome;
