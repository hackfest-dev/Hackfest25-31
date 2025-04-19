import React from 'react';
import { useParams } from 'react-router-dom';  // Import useParams to get dynamic route params
import ChatBox from '../common/ChatBox';

export default function BuyerChat() {
  const { sellerId } = useParams();  // Get sellerId from URL parameter

  return (
    <div style={{ padding: '20px' }}>
      <h2>Chat with Seller</h2>
      <ChatBox otherUserId={sellerId} />  {/* Pass sellerId dynamically to ChatBox */}
    </div>
  );
}
