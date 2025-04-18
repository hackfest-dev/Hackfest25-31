import React, { useEffect, useState } from 'react';
import { db } from '../../firebase';
import { ref, onValue } from 'firebase/database';

export default function AllMaterials() {
  const [materials, setMaterials] = useState([]);

  useEffect(() => {
    const matRef = ref(db, 'materials/');
    onValue(matRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        // Convert object to an array of materials
        setMaterials(Object.values(data));
      } else {
        setMaterials([]); // Set empty array if no data
      }
    });
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h2>All Available Materials</h2>
      {materials.length > 0 ? (
        materials.map((mat, idx) => (
          <div key={idx}>
            <h4>{mat.name}</h4>
            <p>{mat.description}</p>
            <p>Quantity: {mat.quantity}</p>
          </div>
        ))
      ) : (
        <p>No materials available.</p>
      )}
    </div>
  );
}
