import React, { useState, useEffect } from 'react';
import { db, auth } from '../../firebase'; // Make sure Firebase is properly initialized in this file
import { collection, getDocs, addDoc, updateDoc, doc } from 'firebase/firestore';
import './BuyerStyles.css';

export default function BuyerOrder() {
  const [materials, setMaterials] = useState([]);
  const [orders, setOrders] = useState([]);
  const [selectedMaterialId, setSelectedMaterialId] = useState('');
  const [orderQuantity, setOrderQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [error, setError] = useState('');

  // Fetch materials from Firestore
  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const materialsCollection = collection(db, "materials");
        const snapshot = await getDocs(materialsCollection);
        const materialsList = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        
        console.log("Materials fetched:", materialsList); // Check fetched data in console
        setMaterials(materialsList);
      } catch (error) {
        console.error("Error fetching materials: ", error);
        setError("Error fetching materials.");
      }
    };

    fetchMaterials();
  }, []);

  // Fetch orders placed by the current user
  const fetchOrders = async () => {
    if (!auth.currentUser) return; // Ensure the user is logged in
    try {
      const ordersCollection = collection(db, "orders");
      const snapshot = await getDocs(ordersCollection);
      const userOrders = snapshot.docs
        .map(doc => ({
          id: doc.id,
          ...doc.data()
        }))
        .filter(order => order.buyerId === auth.currentUser.uid); // Filter orders by current user

      console.log("Orders fetched:", userOrders);
      setOrders(userOrders);
    } catch (error) {
      console.error("Error fetching orders: ", error);
      setError("Error fetching orders.");
    }
  };

  // Calculate total price based on the selected material and quantity
  useEffect(() => {
    if (selectedMaterialId && orderQuantity > 0) {
      const selectedMaterial = materials.find(mat => mat.id === selectedMaterialId);
      if (selectedMaterial) {
        const price = selectedMaterial.price * orderQuantity;
        setTotalPrice(price);
      }
    }
  }, [selectedMaterialId, orderQuantity, materials]);

  const handlePlaceOrder = async () => {
    if (!auth.currentUser) {
      setError("User not logged in");
      return;
    }

    const selectedMaterial = materials.find(mat => mat.id === selectedMaterialId);
    if (!selectedMaterial) {
      setError("Material not selected");
      return;
    }

    if (orderQuantity > selectedMaterial.quantity) {
      setError("Not enough quantity available.");
      return;
    }

    try {
      const orderData = {
        materialId: selectedMaterialId,
        quantity: orderQuantity,
        price: totalPrice,
        status: 'pending',
        buyerId: auth.currentUser.uid,
        sellerId: selectedMaterial.sellerId,
      };

      // Place the order in the orders collection
      const ordersRef = collection(db, "orders");
      const docRef = await addDoc(ordersRef, orderData);
      console.log("Order placed with ID: ", docRef.id);

      // Reduce the quantity of the material after purchase
      const materialRef = doc(db, "materials", selectedMaterialId);
      await updateDoc(materialRef, {
        quantity: selectedMaterial.quantity - orderQuantity
      });

      // Clear the error message after successful order and fetch updated orders
      setError('');
      fetchOrders();
    } catch (error) {
      console.error("Error placing order: ", error);
      setError("Error placing the order.");
    }
  };

  useEffect(() => {
    fetchOrders(); // Fetch orders once when the component loads
  }, []);

  return (
    <div className="order-container">
      <h1>Place Your Order</h1>
      
      {/* Error Message Display */}
      {error && <p className="error-message">{error}</p>}

      {/* Material Selection Dropdown */}
      <select
        value={selectedMaterialId}
        onChange={(e) => setSelectedMaterialId(e.target.value)}
      >
        <option value="">Select Material</option>
        {materials.length === 0 ? (
          <option disabled>No materials available</option>
        ) : (
          materials.map((material) => (
            <option key={material.id} value={material.id}>
              {material.name} - {material.quantity} available
            </option>
          ))
        )}
      </select>

      {/* Quantity Input */}
      <input
        type="number"
        value={orderQuantity}
        onChange={(e) => setOrderQuantity(Number(e.target.value))}
        min="1"
        max={materials.find(mat => mat.id === selectedMaterialId)?.quantity || 1}
      />

      {/* Display Total Price */}
      <p>Total Price: {totalPrice}</p>

      {/* Place Order Button */}
      <button onClick={handlePlaceOrder}>Place Order</button>

      {/* Orders List */}
      <h2>Your Orders</h2>
      {orders.length === 0 ? (
        <p>You have not placed any orders yet.</p>
      ) : (
        <ul>
          {orders.map((order) => {
            const material = materials.find(mat => mat.id === order.materialId); // Find the material for the order
            return (
              <li key={order.id}>
                <strong>Material:</strong> {material ? material.name : 'Unknown'} <br />
                <strong>Quantity:</strong> {order.quantity} <br />
                <strong>Total Price:</strong> {order.price} <br />
                <strong>Status:</strong> {order.status} <br />
                <hr />
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
