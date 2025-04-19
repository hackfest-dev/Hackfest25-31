import React from 'react';
import RecentConversations from '../common/RecentConversations';
import LogoutButton from '../auth/LogoutButton';

const SellerHome = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h2>Welcome, Seller </h2>
      <RecentConversations userRole="seller" />
      <LogoutButton/>
    </div>
  );
};

export default SellerHome;
