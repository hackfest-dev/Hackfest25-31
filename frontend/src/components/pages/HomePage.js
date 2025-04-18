import React from 'react';
import { Link } from 'react-router-dom';
import './App.css'; 

const HomePage = () => {
  return (
    <div className="homepage-container">
      <h1 className="title">Welcome!</h1>
      <div className="card-container">
        <div className="card">
          <h2>Buyer</h2>
          <Link className="button" to="/buyer/signup">Sign Up</Link>
          <Link className="button" to="/buyer/login">Login</Link>
        </div>
        <div className="card">
          <h2>Seller</h2>
          <Link className="button" to="/seller/signup">Sign Up</Link>
          <Link className="button" to="/seller/login">Login</Link>
        </div>
        <div className="card">
          <h2>Delivery Agent</h2>
          <Link className="button" to="/delivery/signup">Sign Up</Link>
          <Link className="button" to="/delivery/login">Login</Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;