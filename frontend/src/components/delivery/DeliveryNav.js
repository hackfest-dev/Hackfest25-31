import React from 'react';
import { Link } from 'react-router-dom';
import './DeliveryStyles.css';

export default function DeliveryNav() {
  return (
    <nav className="delivery-nav">
      <ul className="nav-links">
        <li>
          <Link to="/delivery/dashboard">Home</Link>
        </li>
        <li>
          <Link to="/delivery/shipments">Shipments</Link>
        </li>
        <li>
          <Link to="/delivery/chat">Chat</Link>
        </li>
      </ul>
    </nav>
  );
}
