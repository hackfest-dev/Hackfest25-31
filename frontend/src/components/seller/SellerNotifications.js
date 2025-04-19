import React, { useEffect, useState } from 'react';
import { db, auth } from '../../firebase';
import { ref, onValue } from 'firebase/database';
import { onAuthStateChanged } from 'firebase/auth';
import './SellerStyles.css'
export default function SellerNotifications() {
  const [notifications, setNotifications] = useState([]);
  const [sellerUID, setSellerUID] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) setSellerUID(user.uid);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (sellerUID) {
      const notificationsRef = ref(db, `users/${sellerUID}/notifications`);
      onValue(notificationsRef, (snapshot) => {
        const data = snapshot.val();
        const notificationsArray = data ? Object.values(data) : [];
        setNotifications(notificationsArray);
      });
    }
  }, [sellerUID]);

  return (
    <div style={{ padding: '20px' }}>
      <h3>📢 Notifications</h3>
      {notifications.length > 0 ? (
        notifications.map((note, index) => (
          <div key={index} style={{ background: '#eee', margin: '10px', padding: '10px', borderRadius: '8px' }}>
            <p>{note.message}</p>
            <small>{new Date(note.timestamp).toLocaleString()}</small>
          </div>
        ))
      ) : (
        <p>No new notifications.</p>
      )}
    </div>
  );
}
