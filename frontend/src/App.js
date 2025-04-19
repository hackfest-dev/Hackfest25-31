import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import BuyerSignup from './components/auth/BuyerSignup';
import BuyerLogin from './components/auth/BuyerLogin';
import SellerSignup from './components/auth/SellerSignup';
import SellerLogin from './components/auth/SellerLogin';
import DeliverySignup from './components/auth/DeliverySignup';
import DeliveryLogin from './components/auth/DeliveryLogin';

import HomePage from './components/pages/HomePage';
import Welcome from './components/pages/Welcome';

import SellerNav from './components/seller/SellerNav';
import SellerHome from './components/seller/SellerHome';
import Materials from './components/seller/Materials';
import SellerChat from './components/seller/SellerChat';
import Tracking from './components/seller/Tracking';

import BuyerNav from './components/buyer/BuyerNav';
import BuyerHome from './components/buyer/BuyerHome';
import MaterialSearch from './components/buyer/MaterialSearch';
import AllMaterials from './components/buyer/AllMaterials';
import BuyerTracking from './components/buyer/BuyerTracking';
import BuyerChat from './components/buyer/BuyerChat';

import DeliveryNav from './components/delivery/DeliveryNav';
import DeliveryHome from './components/delivery/DeliveryHome';
import DeliveryList from './components/delivery/DeliveryList';
import DeliveryChat from './components/delivery/DeliveryChat';

import SellerOrders from './components/seller/SellerOrders';
import PlaceOrderPage from './components/buyer/PlaceOrderPage';
import BuyerOrder from './components/buyer/BuyerOrder';

// Import CSS
import './components/common/CommonStyles.css';
import './components/auth/AuthForm.css';
import './components/buyer/BuyerStyles.css';
import './components/seller/SellerStyles.css';
import './components/delivery/DeliveryStyles.css';
import './components/pages/App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          {/* Welcome Page is now the landing page */}
          <Route path="/" element={<div className="page-container"><Welcome /></div>} />
          {/* Login/Signup moved here */}
          <Route path="/login" element={<div className="page-container"><HomePage /></div>} />

          {/* Auth Routes */}
          <Route path="/buyer/signup" element={<div className="page-container"><BuyerSignup /></div>} />
          <Route path="/buyer/login" element={<div className="page-container"><BuyerLogin /></div>} />
          <Route path="/seller/signup" element={<div className="page-container"><SellerSignup /></div>} />
          <Route path="/seller/login" element={<div className="page-container"><SellerLogin /></div>} />
          <Route path="/delivery/login" element={<div className="page-container"><DeliveryLogin /></div>} />
          <Route path="/delivery/signup" element={<div className="page-container"><DeliverySignup /></div>} />
          <Route path="/buyer/orders" element={<BuyerOrder />} /> 

          {/* Chat and Order Routes */}
          <Route path="/buyer/chat/:sellerId" element={<div className="page-container"><BuyerChat /></div>} />
          <Route path="/seller/chat/:buyerId" element={<div className="page-container"><SellerChat /></div>} />
          <Route path="/delivery/chat/:userId" element={<div className="page-container"><DeliveryChat /></div>} />
          <Route path="/buyer/place-order/:materialId" element={<div className="page-container"><PlaceOrderPage /></div>} />
          <Route path="/delivery/dashboard" element={<div className="page-container delivery-dashboard"><DeliveryNav /><DeliveryHome /></div>} />
          <Route path="/seller/orders" element={<div className="page-container seller-dashboard"><SellerNav /><SellerOrders /></div>} />

          {/* Seller Routes */}
          <Route path="/seller/dashboard" element={
            <div className="page-container seller-dashboard">
              <SellerNav />
              <SellerHome />
            </div>
          } />
          <Route path="/seller/materials" element={
            <div className="page-container seller-dashboard">
              <SellerNav />
              <Materials />
            </div>
          } />
          <Route path="/seller/chat" element={
            <div className="page-container seller-dashboard">
              <SellerNav />
              <SellerChat />
            </div>
          } />
          <Route path="/seller/tracking" element={
            <div className="page-container seller-dashboard">
              <SellerNav />
              <Tracking />
            </div>
          } />

          {/* Buyer Routes */}
          <Route path="/buyer/dashboard" element={
            <div className="page-container buyer-dashboard">
              <BuyerNav />
              <BuyerHome />
            </div>
          } />
          <Route path="/buyer/search" element={
            <div className="page-container buyer-dashboard">
              <BuyerNav />
              <MaterialSearch />
            </div>
          } />
          <Route path="/buyer/all-materials" element={
            <div className="page-container buyer-dashboard">
              <BuyerNav />
              <AllMaterials />
            </div>
          } />
          <Route path="/buyer/tracking" element={
            <div className="page-container buyer-dashboard">
              <BuyerNav />
              <BuyerTracking />
            </div>
          } />
          <Route path="/buyer/chat" element={
            <div className="page-container buyer-dashboard">
              <BuyerNav />
              <BuyerChat />
            </div>
          } />

          {/* Delivery Routes */}
          <Route path="/delivery/list" element={
            <div className="page-container delivery-dashboard">
              <DeliveryNav />
              <DeliveryList />
            </div>
          } />
          <Route path="/delivery/dashboard" element={
            <div className="page-container delivery-dashboard">
              <DeliveryNav />
              <DeliveryHome />
            </div>
          } />
          <Route path="/delivery/chat" element={
            <div className="page-container delivery-dashboard">
              <DeliveryNav />
              <DeliveryChat />
            </div>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
