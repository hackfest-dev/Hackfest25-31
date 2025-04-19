import React, { useEffect, useState } from 'react';
import { db, auth } from '../../firebase';
import { ref, onValue } from 'firebase/database';
import { useNavigate } from 'react-router-dom';

export default function RecentConversations({ userRole }) {
  const [chatList, setChatList] = useState([]);
  const navigate = useNavigate();
  const user = auth.currentUser;

  useEffect(() => {
    if (!user) return;

    const chatsRef = ref(db, 'chats/');
    onValue(chatsRef, (snapshot) => {
      const allChats = snapshot.val() || {};
      const myChats = Object.entries(allChats)
        .filter(([chatId]) => chatId.includes(user.uid))
        .map(([chatId, data]) => {
          const otherUID = chatId.split('_').find(uid => uid !== user.uid);
          return {
            chatId,
            otherUID,
            lastMessage: data.metadata?.lastMessage || '',
            timestamp: data.metadata?.timestamp || 0,
          };
        });
      setChatList(myChats.sort((a, b) => b.timestamp - a.timestamp));
    });
  }, [user]);

  const goToChat = (otherUID) => {
    if (userRole === 'buyer') navigate(`/buyer/chat/${otherUID}`);
    if (userRole === 'seller') navigate(`/seller/chat/${otherUID}`);
    if (userRole === 'delivery') navigate(`/delivery/chat/${otherUID}`);
  };

  return (
    <div>
      <h3> Recent Conversations</h3>
      {chatList.map((chat, i) => (
        <div key={i} style={{ borderBottom: '1px solid #ddd', padding: '8px' }}>
          <p><b>User:</b> {chat.otherUID}</p>
          <p><i>{chat.lastMessage}</i></p>
          <button onClick={() => goToChat(chat.otherUID)}>Open Chat</button>
        </div>
      ))}
    </div>
  );
}
