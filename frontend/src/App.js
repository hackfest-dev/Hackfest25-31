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
<<<<<<< Updated upstream
        
=======

        <Route path="/buyer/chat/:sellerId" element={<BuyerChat />} />
        <Route path="/seller/chat/:buyerId" element={<SellerChat />} />
        <Route path="/delivery/chat/:userId" element={<DeliveryChat />} />

>>>>>>> Stashed changes
        <Route path="/seller/dashboard" element={
          <>
            <SellerNav />
            <SellerHome />
          </>
        } />
<<<<<<< Updated upstream
        
=======
>>>>>>> Stashed changes
        <Route path="/seller/materials" element={
          <>
            <SellerNav />
            <Materials />
          </>
        } />
<<<<<<< Updated upstream
        
        <Route path="/seller/chat" element={
          <>
            <SellerNav />
            <Chat />
          </>
        } />
        
=======
        <Route path="/seller/chat" element={
          <>
            <SellerNav />
            <SellerChat />
          </>
        } />
>>>>>>> Stashed changes
        <Route path="/seller/tracking" element={
          <>
            <SellerNav />
            <Tracking />
          </>
        } />
<<<<<<< Updated upstream
        
=======

>>>>>>> Stashed changes
        <Route path="/buyer/dashboard" element={
          <>
            <BuyerNav />
            <BuyerHome />
          </>
        } />
<<<<<<< Updated upstream
        
=======
>>>>>>> Stashed changes
        <Route path="/buyer/search" element={
          <>
            <BuyerNav />
            <MaterialSearch />
          </>
        } />
<<<<<<< Updated upstream
        
=======
>>>>>>> Stashed changes
        <Route path="/buyer/all-materials" element={
          <>
            <BuyerNav />
            <AllMaterials />
          </>
        } />
<<<<<<< Updated upstream
        
=======
>>>>>>> Stashed changes
        <Route path="/buyer/tracking" element={
          <>
            <BuyerNav />
            <BuyerTracking />
          </>
        } />
<<<<<<< Updated upstream
        
=======
>>>>>>> Stashed changes
        <Route path="/buyer/chat" element={
          <>
            <BuyerNav />
            <BuyerChat />
          </>
        } />
<<<<<<< Updated upstream
        
=======

>>>>>>> Stashed changes
        <Route path="/delivery/dashboard" element={
          <>
            <DeliveryNav />
            <DeliveryHome />
          </>
        } />
<<<<<<< Updated upstream
        
=======
>>>>>>> Stashed changes
        <Route path="/delivery/shipments" element={
          <>
            <DeliveryNav />
            <DeliveryList />
          </>
        } />
<<<<<<< Updated upstream
        
=======
>>>>>>> Stashed changes
        <Route path="/delivery/chat" element={
          <>
            <DeliveryNav />
            <DeliveryChat />
          </>
        } />
<<<<<<< Updated upstream
        
=======
>>>>>>> Stashed changes
      </Routes>
    </Router>
  );
}

export default App;
