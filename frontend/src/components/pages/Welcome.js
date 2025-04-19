// Welcome.js
import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './App1.css';

const Welcome = () => {
  const dropdownRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        dropdownRef.current.removeAttribute("open");
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLoginRedirect = () => {
    navigate('/login');

    
  };

  return (
    <div className="welcome-container">
      <header className="welcome-header">
        <div className="logo">Connect</div>

        <div className="nav-actions">
          <details ref={dropdownRef} className="about-dropdown">
            <summary>About Us</summary>
            <p>
              Connect is a platform where buyers, sellers, and delivery agents
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
        <p>Welcome to Connect – your one-stop solution for smooth, streamlined material handling and delivery coordination.</p>
      </main>
    </div>
  );
};

export default Welcome;