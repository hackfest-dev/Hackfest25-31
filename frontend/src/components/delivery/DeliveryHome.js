import React from 'react';
<<<<<<< Updated upstream
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
=======
import RecentConversations from '../common/RecentConversations';

export default function DeliveryHome() {
  return (
    <div style={{ padding: '20px' }}>
      <h2>Welcome, Delivery Agent </h2>
      <RecentConversations userRole="delivery" />
    </div>
  );
}
>>>>>>> Stashed changes
