import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db, auth } from '../../firebase';
import { ref as dbRef, push, get } from 'firebase/database';
import './BuyerStyles.css';

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
          setMaterial(materialSnapshot.val());
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

  const handleOrder = () => {
    if (quantity <= 0) {
      setError('Please select a valid quantity.');
      return;
    }
  
    if (!auth.currentUser) {
      setError('User not logged in.');
      return;
    }
  
    console.log("Material object:", material); // ⬅️ ADD THIS
    if (!material || !material.seller_id) {
      setError('Seller information is missing.');
      return;
    }
  
    const orderRef = dbRef(db, 'deliveries');
  
    const orderData = {
      buyer_id: auth.currentUser.uid,
      seller_id: material.seller_id,
      material_id: materialId,
      material_name: material.name,
      quantity,
      status: 'Order Placed',
      delivery_id: null,
      timestamp: Date.now(),
    };
  
    push(orderRef, orderData)
      .then(() => {
        alert('Order placed successfully!');
        navigate('/buyer/orders');
      })
      .catch((err) => {
        console.error('Order placement error:', err);
        setError('Error placing the order. Please try again.');
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
