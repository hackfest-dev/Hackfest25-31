import React from 'react';
import { useParams } from 'react-router-dom';  
import ChatBox from '../common/ChatBox';

export default function SellerChat() {
  
  const { buyerId } = useParams();

  return (
    <div style={{ padding: '20px' }}>
      <h2>Chat with Buyer</h2>
      <ChatBox otherUserId={buyerId} />
    </div>
  );
}
