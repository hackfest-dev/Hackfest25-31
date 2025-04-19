// Welcome.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './App1.css';

const Welcome = () => {
  const navigate = useNavigate();

  const handleLoginRedirect = () => {
    navigate('/login');
  };

  return (
    <div className="welcome-container">
      <header className="welcome-header">
        <div className="logo">MatConnect</div>

        <div className="nav-actions">
          <details className="about-dropdown">
            <summary>About Us</summary>
            <p>
              MatConnect is a platform where buyers, sellers, and delivery agents
              connect seamlessly to manage materials, orders, and logistics efficiently.
            </p>
          </details>

          <button onClick={handleLoginRedirect} className="login-button">
            Login / Signup
          </button>
        </div>
      </header>

      <main className="welcome-main">
        <h1>WELCOME!</h1>
        <h2>Connecting Buyers, Sellers & Delivery Agents</h2>
        <p>Welcome to MatConnect – your one-stop solution for smooth, streamlined material handling and delivery coordination.</p>
      </main>
    </div>
  );
};

export default Welcome;
