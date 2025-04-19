import React from 'react';
import { useParams } from 'react-router-dom';  
import ChatBox from '../common/ChatBox';
import RecentConversations from '../common/RecentConversations';

export default function SellerChat() {
  const { buyerId } = useParams();

  return (
    <div style={{ padding: '20px' }}>
      <h2>Seller Chat</h2>

      {/* Show recent conversations always */}
      <RecentConversations userRole="seller" />

      {/* Only show ChatBox if buyerId is present */}
      {buyerId ? (
        <div style={{ marginTop: '30px' }}>
          <h3>Chat with Buyer</h3>
          <ChatBox otherUserId={buyerId} />
        </div>
      ) : (
        <p>Select a buyer to start chatting.</p>
      )}
    </div>
  );
}
