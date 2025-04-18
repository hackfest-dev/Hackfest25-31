import React from 'react';
import { Link } from 'react-router-dom';

export default function BuyerNav() {
  return (
    <nav style={{ display: 'flex', gap: '20px', padding: '10px', backgroundColor: '#e0f7fa' }}>
      <Link to="/buyer/dashboard">Home</Link>
      <Link to="/buyer/search">Search</Link>
      <Link to="/buyer/all-materials">Browse</Link>
      <Link to="/buyer/tracking">Tracking</Link>
      <Link to="/buyer/chat">Chat</Link>
    </nav>
  );
}
