import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import BuyerSignup from './components/auth/BuyerSignup';
import BuyerLogin from './components/auth/BuyerLogin';
import SellerSignup from './components/auth/SellerSignup';
import SellerLogin from './components/auth/SellerLogin';
import DeliverySignup from './components/auth/DeliverySignup';
import DeliveryLogin from './components/auth/DeliveryLogin';

import SellerNav from './components/seller/Sellernav';
import SellerHome from './components/seller/SellerHome';
import Materials from './components/seller/Materials';
import Chat from './components/seller/Chat';
import Tracking from './components/seller/Tracking';

import HomePage from './pages/HomePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/buyer/signup" element={<BuyerSignup />} />
        <Route path="/buyer/login" element={<BuyerLogin />} />
        <Route path="/seller/signup" element={<SellerSignup />} />
        <Route path="/seller/login" element={<SellerLogin />} />
        <Route path="/delivery/signup" element={<DeliverySignup />} />
        <Route path="/delivery/login" element={<DeliveryLogin />} />
        <Route path="/seller/dashboard" element={
            <>
              <SellerNav />
              <SellerHome />
            </>
          } />

          <Route path="/seller/materials" element={
            <>
              <SellerNav />
              <Materials />
            </>
          } />
          <Route path="/seller/chat" element={
            <>
              <SellerNav />
              <Chat />
            </>
          } />
          <Route path="/seller/tracking" element={
            <>
              <SellerNav />
              <Tracking />
            </>
          } />
          
                </Routes>
              </Router>

          
            );
          }

export default App;