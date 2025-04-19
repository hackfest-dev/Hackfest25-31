import React, { useEffect, useState } from 'react';
import { db, auth } from '../../firebase';
import { ref, onValue } from 'firebase/database';
import { useNavigate } from 'react-router-dom';

export default function RecentConversations({ userRole }) {
  const [chatList, setChatList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (!currentUser) return;

      const chatsRef = ref(db, 'chats/');
      onValue(chatsRef, (snapshot) => {
        const allChats = snapshot.val() || {};
        const myChats = Object.entries(allChats)
          .filter(([chatId]) => chatId.includes(currentUser.uid))
          .map(([chatId, data]) => {
            const otherUID = chatId.split('_').find(uid => uid !== currentUser.uid);
            return {
              chatId,
              otherUID,
              lastMessage: data?.metadata?.lastMessage || 'No messages yet',
              timestamp: data?.metadata?.timestamp || 0,
            };
          });

        // Sort by latest message timestamp
        setChatList(myChats.sort((a, b) => b.timestamp - a.timestamp));
      });
    });

    return () => unsubscribe(); // cleanup auth listener
  }, []);

  const goToChat = (otherUID) => {
    if (userRole === 'buyer') navigate(`/buyer/chat/${otherUID}`);
    if (userRole === 'seller') navigate(`/seller/chat/${otherUID}`);
    if (userRole === 'delivery') navigate(`/delivery/chat/${otherUID}`);
  };

  return (
    <div style={{ padding: '10px' }}>
      <h3>Recent Conversations</h3>
      {chatList.length === 0 ? (
        <p>No recent chats yet.</p>
      ) : (
        chatList.map((chat, i) => (
          <div
            key={i}
            style={{
              borderBottom: '1px solid #ccc',
              padding: '10px',
              marginBottom: '5px',
              borderRadius: '8px',
              background: '#fafafa',
            }}
          >
            <p><strong>User:</strong> {chat.otherUID}</p>
            <p><em>{chat.lastMessage}</em></p>
            <button onClick={() => goToChat(chat.otherUID)}>Open Chat</button>
          </div>
        ))
      )}
    </div>
  );
}
