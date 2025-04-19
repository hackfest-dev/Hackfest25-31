import React, { useEffect, useState } from 'react';
import { db, auth } from '../../firebase';
import { ref, onValue, push, update } from 'firebase/database';

export default function ChatBox({ otherUserId }) {
  const [messages, setMessages] = useState([]);
  const [newMsg, setNewMsg] = useState('');
  const [userUID, setUserUID] = useState(null);

  // Track logged-in user
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserUID(user.uid);
      } else {
        setUserUID(null);
      }
    });

    return () => unsubscribe();
  }, []);

  // Create unique chat ID using both user UIDs
  const chatId =
    userUID && otherUserId
      ? [userUID, otherUserId].sort().join('_')
      : null;

  // Listen for new messages
  useEffect(() => {
    if (!chatId) return;

    const messagesRef = ref(db, `chats/${chatId}/messages`);
    const unsubscribe = onValue(messagesRef, (snapshot) => {
      const data = snapshot.val();
      const msgArray = data ? Object.values(data) : [];
      setMessages(msgArray);
    });

    return () => unsubscribe();
  }, [chatId]);

  // Send a new message and update metadata
  const sendMessage = () => {
    if (!newMsg.trim() || !userUID || !chatId) return;

    const messagesRef = ref(db, `chats/${chatId}/messages`);

    // Push new message
    push(messagesRef, {
      sender: userUID,
      text: newMsg,
      timestamp: Date.now(),
    });

    // Update metadata for recent conversations
    update(ref(db, `chats/${chatId}/metadata`), {
      lastMessage: newMsg,
      timestamp: Date.now(),
    });

    setNewMsg('');
  };

  if (!userUID) {
    return <p>Please log in to chat.</p>;
  }

  return (
    <div style={{ border: '1px solid gray', padding: '10px', borderRadius: '8px' }}>
      <h3>💬 Chat</h3>
      <div
        style={{
          height: '250px',
          overflowY: 'scroll',
          border: '1px solid #ccc',
          borderRadius: '6px',
          padding: '8px',
          marginBottom: '10px',
          background: '#f9f9f9',
        }}
      >
        {messages.map((msg, i) => (
          <p key={i} style={{ margin: '6px 0' }}>
            <b>{msg.sender === userUID ? 'You' : 'Them'}:</b> {msg.text}
          </p>
        ))}
      </div>
      <input
        type="text"
        value={newMsg}
        onChange={(e) => setNewMsg(e.target.value)}
        placeholder="Type a message"
        style={{
          padding: '8px',
          width: '70%',
          marginRight: '8px',
          borderRadius: '4px',
          border: '1px solid #ccc',
        }}
      />
      <button onClick={sendMessage} style={{ padding: '8px 16px' }}>
        Send
      </button>
    </div>
  );
}
