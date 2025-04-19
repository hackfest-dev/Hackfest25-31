import React from 'react';
import { Link } from 'react-router-dom';

export default function SellerNav() {
  return (
    <nav style={{ display: 'flex', gap: '20px', padding: '10px', backgroundColor: '#f0f0f0' }}>
      <Link to="/seller/dashboard">Main Menu</Link>
      <Link to="/seller/materials">Materials</Link>
      <Link to="/seller/chat">Chat</Link>
      <Link to="/seller/orders">My Orders</Link>
      <Link to="/seller/tracking">Tracking</Link>
    </nav>
  );
}
