import React, { useEffect, useState } from 'react';
import { db } from '../../firebase';
import { ref, onValue } from 'firebase/database';
import './BuyerStyles.css';

export default function AllMaterials() {
  const [materials, setMaterials] = useState([]);

  useEffect(() => {
    const matRef = ref(db, 'materials/');
    onValue(matRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setMaterials(Object.values(data));
      } else {
        setMaterials([]);
      }
    });
  }, []);

  return (
    <div className="material-section">
      <h2 className="section-heading">All Available Materials</h2>
      {materials.length > 0 ? (
        materials.map((mat, idx) => (
          <div className="material-card" key={idx}>
            <h4>{mat.name}</h4>
            <p>{mat.description}</p>
            <p><strong>Quantity:</strong> {mat.quantity}</p>
          </div>
        ))
      ) : (
        <p>No materials available.</p>
      )}
    </div>
  );
}
