import React from 'react';
import RecentConversations from '../common/RecentConversations';
import LogoutButton from '../auth/LogoutButton';

export default function DeliveryHome() {
  return (
    <div style={{ padding: '20px' }}>
      <h2>Welcome, Delivery Agent </h2>
      <RecentConversations userRole="delivery" />
      <LogoutButton/>
    </div>
  );
}
