import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db, auth } from '../../firebase';
import { ref as dbRef, push, get } from 'firebase/database';
import './BuyerStyles.css';
import { doc, updateDoc } from 'firebase/firestore'; 
import { dbFirestore } from '../../firebase';  // Adjust the path according to your file structure


const PlaceOrderPage = () => {
  const { materialId } = useParams();
  const navigate = useNavigate();

  const [material, setMaterial] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMaterial = async () => {
      try {
        const materialSnapshot = await get(dbRef(db, `materials/${materialId}`));
        if (materialSnapshot.exists()) {
          const materialData = materialSnapshot.val();
          setMaterial(materialData);
        } else {
          setError('Material not found');
        }
      } catch (err) {
        console.error('Error fetching material:', err);
        setError('Failed to load material data.');
      }
    };
  
    fetchMaterial();
  }, [materialId]);
  
// PlaceOrderPage.js

const handleOrder = () => {
  if (quantity <= 0) {
    setError('Please select a valid quantity.');
    alert("Invalid quantity selected!");
    return;
  }

  if (!auth.currentUser) {
    setError('User not logged in.');
    alert("User not logged in! Please log in first.");
    return;
  }

  if (!material || !material.seller_id) {
    setError('Seller information is missing.');
    alert("Seller information is missing in material data!");
    return;
  }

  // Log material details for debugging
  console.log("Material object:", material);

  // Define the order data to include a status field for shipment tracking
  const orderRef = dbRef(db, 'deliveries');
  
  const orderData = {
    buyer_id: auth.currentUser.uid,
    seller_id: material.seller_id,
    material_id: materialId,
    material_name: material.name,
    quantity,
    status: 'Order Placed',  // Initial status
    delivery_id: null, // Set delivery_id as null initially
    timestamp: Date.now(),
  };

  // Push to database (assuming Realtime Database here)
  push(orderRef, orderData)
    .then((orderRef) => {
      const deliveryId = orderRef.key; // Get the newly generated delivery ID

      // Update order with the delivery_id using updateDoc from Firestore
      const orderDocRef = doc(dbFirestore, 'orders', deliveryId); // Firestore reference
      const updatedOrderData = {
        ...orderData,
        delivery_id: deliveryId, // Assign delivery ID to the order
      };

      updateDoc(orderDocRef, updatedOrderData); // Use updateDoc for Firestore

      // Optionally, notify the buyer and delivery agent here (could be via messaging, email, etc.)
      console.log("Order placed with delivery ID:", deliveryId);

      alert('Order placed successfully!');
      navigate('/buyer/orders');
    })
    .catch((err) => {
      console.error('Order placement error:', err);
      setError('Error placing the order. Please try again.');
      alert("Error placing the order. Check console for more details.");
    });
};


  return (
    <div className="place-order-container">
      <h2 className="place-order-title">Place Order for Material</h2>

      {error && <p className="error-message">{error}</p>}

      {material ? (
        <div className="material-details">
          <h3 className="material-name">{material.name}</h3>
          <p className="material-description">{material.description}</p>
          <p className="material-price">Price: <strong>{material.price}</strong></p>
          <p className="material-quantity">Available Quantity: <strong>{material.quantity}</strong></p>

          <label className="quantity-label">
            Quantity:
            <input
              type="number"
              className="quantity-input"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              min="1"
              max={material.quantity}
            />
          </label>

          <div className="order-button-container">
            <button className="place-order-button" onClick={handleOrder}>Place Order</button>
          </div>
        </div>
      ) : (
        <p className="loading-message">Loading material details...</p>
      )}
    </div>
  );
};

export default PlaceOrderPage;
