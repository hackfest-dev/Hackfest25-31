import React, { useState } from 'react';
import { db } from '../../firebase';
import { ref, push } from 'firebase/database';

export default function Materials() {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    
    const quantityNum = parseInt(quantity, 10);

    if (isNaN(quantityNum)) {
      alert("Please enter a valid number for quantity.");
      return;
    }

    if (!name || !description) {
      alert("Please fill in all fields.");
      return;
    }

    const materialRef = ref(db, 'materials/');
    push(materialRef, {
      name,
      quantity: quantityNum,  
      description,
      timestamp: Date.now()
    })
      .then(() => {
        alert("Material added!");
        setName('');
        setQuantity('');
        setDescription('');
      })
      .catch((error) => {
        console.error("Error adding material:", error);
        alert("Failed to add material."+ error.messgae);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add New Material</h2>
      <input
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="Material Name"
        required
      />
      <input
        value={quantity}
        onChange={e => setQuantity(e.target.value)}
        placeholder="Quantity"
        required
      />
      <textarea
        value={description}
        onChange={e => setDescription(e.target.value)}
        placeholder="Description"
      />
      <button type="submit">Add Material</button>
    </form>
  );
}