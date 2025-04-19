import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import BuyerSignup from './components/auth/BuyerSignup';
import BuyerLogin from './components/auth/BuyerLogin';
import SellerSignup from './components/auth/SellerSignup';
import SellerLogin from './components/auth/SellerLogin';
import DeliverySignup from './components/auth/DeliverySignup';
import DeliveryLogin from './components/auth/DeliveryLogin';

import HomePage from './components/pages/HomePage';

import SellerNav from './components/seller/SellerNav';
import SellerHome from './components/seller/SellerHome';
import Materials from './components/seller/Materials';
import Chat from './components/seller/Chat';
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

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/buyer/signup" element={<BuyerSignup />} />
        <Route path="/buyer/login" element={<BuyerLogin />} />
        <Route path="/seller/signup" element={<SellerSignup />} />
        <Route path="/seller/login" element={<SellerLogin />} />
        <Route path="/delivery/login" element={<DeliveryLogin />} />
        <Route path="/delivery/signup" element={<DeliverySignup />} />
        
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
        
        <Route path="/buyer/dashboard" element={
          <>
            <BuyerNav />
            <BuyerHome />
          </>
        } />
        
        <Route path="/buyer/search" element={
          <>
            <BuyerNav />
            <MaterialSearch />
          </>
        } />
        
        <Route path="/buyer/all-materials" element={
          <>
            <BuyerNav />
            <AllMaterials />
          </>
        } />
        
        <Route path="/buyer/tracking" element={
          <>
            <BuyerNav />
            <BuyerTracking />
          </>
        } />
        
        <Route path="/buyer/chat" element={
          <>
            <BuyerNav />
            <BuyerChat />
          </>
        } />
        
        <Route path="/delivery/dashboard" element={
          <>
            <DeliveryNav />
            <DeliveryHome />
          </>
        } />
        
        <Route path="/delivery/shipments" element={
          <>
            <DeliveryNav />
            <DeliveryList />
          </>
        } />
        
        <Route path="/delivery/chat" element={
          <>
            <DeliveryNav />
            <DeliveryChat />
          </>
        } />
        
      </Routes>
    </Router>
  );
}

export default App;
