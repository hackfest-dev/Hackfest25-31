import React from 'react';
import { Link } from 'react-router-dom';

export default function DeliveryNav() {
  return (
    <nav style={{ display: 'flex', gap: '20px', padding: '10px', backgroundColor: '#f9fbe7' }}>
      <Link to="/delivery/dashboard">Home</Link>
      <Link to="/delivery/shipments">Shipments</Link>
      <Link to="/delivery/chat">Chat</Link>
    </nav>
  );
}
