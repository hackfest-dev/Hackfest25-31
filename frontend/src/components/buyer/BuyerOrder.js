import React, { useState, useEffect } from 'react';
import { dbFirestore } from '../../firebase';  // Correct import of dbFirestore
import { collection, getDocs } from 'firebase/firestore';  // Import Firestore methods

const BuyerOrder = () => {
  // State to store materials and orders
  const [materials, setMaterials] = useState([]);
  const [orders, setOrders] = useState([]);

  // Fetch materials from Firestore
  const fetchMaterials = async () => {
    try {
      const snapshot = await getDocs(collection(dbFirestore, 'materials'));  // Correct Firestore usage
      const materialsList = snapshot.docs.map(doc => doc.data());
      setMaterials(materialsList);
    } catch (error) {
      console.error("Error fetching materials: ", error);
    }
  };

  // Fetch orders from Firestore
  const fetchOrders = async () => {
    try {
      const snapshot = await getDocs(collection(dbFirestore, 'orders'));  // Correct Firestore usage
      const ordersList = snapshot.docs.map(doc => doc.data());
      setOrders(ordersList);
    } catch (error) {
      console.error("Error fetching orders: ", error);
    }
  };

  // Call fetch functions on component mount
  useEffect(() => {
    fetchMaterials();
    fetchOrders();
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  return (
    <div>
      <h1>Buyer Orders</h1>

      {/* Display materials */}
      <h2>Materials</h2>
      <ul>
        {materials.map((material, index) => (
          <li key={index}>{material.name} - {material.description}</li>  // Adjust properties based on your data structure
        ))}
      </ul>

      {/* Display orders */}
      <h2>Orders</h2>
      <ul>
        {orders.map((order, index) => (
          <li key={index}>{order.orderId} - {order.status}</li>  // Adjust properties based on your data structure
        ))}
      </ul>
    </div>
  );
};

export default BuyerOrder;
