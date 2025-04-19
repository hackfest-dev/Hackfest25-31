import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db, auth } from '../../firebase';
import { ref as dbRef, push, get } from 'firebase/database';
import './BuyerStyles.css'
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
    <div style={{ padding: '20px' }}>
      <h2>Place Order for Material</h2>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {material ? (
        <div>
          <h3>{material.name}</h3>
          <p>{material.description}</p>
          <p>Price: {material.price}</p>
          <p>Available Quantity: {material.quantity}</p>

          <label>
            Quantity:
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              min="1"
              max={material.quantity}
            />
          </label>

          <div style={{ marginTop: '20px' }}>
            <button onClick={handleOrder}>Place Order</button>
          </div>
        </div>
      ) : (
        <p>Loading material details...</p>
      )}
    </div>
  );
};

export default PlaceOrderPage;
