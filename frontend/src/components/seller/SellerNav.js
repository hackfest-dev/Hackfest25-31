import React from 'react';
import { Link } from 'react-router-dom';
import './SellerStyles.css';

export default function SellerNav() {
  return (
    <nav className="seller-navbar">
      <Link to="/seller/dashboard" className="seller-navbar-link">
        Main Menu
      </Link>
      <Link to="/seller/materials" className="seller-navbar-link">
        Materials
      </Link>
      <Link to="/seller/chat" className="seller-navbar-link">
        Chat
      </Link>
      <Link to="/seller/orders" className="seller-navbar-link">
        My Orders
      </Link>
      <Link to="/seller/tracking" className="seller-navbar-link">
        Tracking
      </Link>
    </nav>
  );
}
