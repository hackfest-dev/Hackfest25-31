import React from 'react';
import { useParams } from 'react-router-dom';
import ChatBox from '../common/ChatBox';

export default function DeliveryChat() {
  const { userId } = useParams();
  return (
    <div style={{ padding: '20px' }}>
      <h2>Chat with User</h2>
      <ChatBox otherUserId={userId} />
    </div>
  );
}
