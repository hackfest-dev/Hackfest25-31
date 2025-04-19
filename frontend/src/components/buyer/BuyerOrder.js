import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { collection, getDocs, addDoc } from 'firebase/firestore'; // Importing getDocs

export default function BuyerOrder() {
  const [materials, setMaterials] = useState([]);
  const [selectedMaterialId, setSelectedMaterialId] = useState('');
  const [orderQuantity, setOrderQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0); // Set the price later based on quantity and material price

  useEffect(() => {
    // Fetch materials from Firestore
    const fetchMaterials = async () => {
      try {
        // Get materials from Firestore
        const materialsCollection = collection(db, "materials");
        const snapshot = await getDocs(materialsCollection);
        const materialsList = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setMaterials(materialsList);
      } catch (error) {
        console.error("Error fetching materials: ", error);
      }
    };

    fetchMaterials();
  }, []);

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
    try {
      const orderData = {
        materialId: selectedMaterialId,
        quantity: orderQuantity,
        price: totalPrice,
        status: 'pending',
        buyerId: 'buyer_id', // Replace with actual buyer ID
        sellerId: 'seller_id', // Replace with actual seller ID
      };

      const ordersRef = collection(db, "orders");
      const docRef = await addDoc(ordersRef, orderData);
      console.log("Order placed with ID: ", docRef.id);
    } catch (error) {
      console.error("Error placing order: ", error);
    }
  };

  return (
    <div>
      <h1>Place Your Order</h1>
      <select
        value={selectedMaterialId}
        onChange={(e) => setSelectedMaterialId(e.target.value)}
      >
        <option value="">Select Material</option>
        {materials.map((material) => (
          <option key={material.id} value={material.id}>
            {material.name}
          </option>
        ))}
      </select>
      <input
        type="number"
        value={orderQuantity}
        onChange={(e) => setOrderQuantity(e.target.value)}
        min="1"
        max={selectedMaterialId ? materials.find(mat => mat.id === selectedMaterialId).quantity : 1}
      />
      <p>Total Price: {totalPrice}</p>
      <button onClick={handlePlaceOrder}>Place Order</button>
    </div>
  );
}
