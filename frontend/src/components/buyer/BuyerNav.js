import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './BuyerStyles.css';
import LogoutButton from '../auth/LogoutButton';

export default function BuyerNav() {
  const location = useLocation();

  const navLinks = [
    { to: '/buyer/dashboard', label: 'Home' },
    { to: '/buyer/search', label: 'Search' },
    { to: '/buyer/all-materials', label: 'Browse' },
    { to: '/buyer/tracking', label: 'Tracking' },
    { to: '/buyer/chat', label: 'Chat' }
  ];

  return (
    <nav className="buyer-horizontal-nav">
      <div className="nav-links-container">
        {navLinks.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className={`buyer-nav-link ${
              location.pathname === link.to ? 'active' : ''
            }`}
          >
            {link.label}
          </Link>
        ))}
      </div>
      <div className="logout-button-container">
        <LogoutButton />
      </div>
    </nav>
  );
}
