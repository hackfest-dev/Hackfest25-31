import React, { useState } from 'react';
import { db } from '../../firebase';
import { ref, push } from 'firebase/database';

export default function Materials() {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const materialRef = ref(db, 'materials/');
    push(materialRef, {
      name,
      quantity,
      description,
      timestamp: Date.now()
    });
    alert("Material added!");
    setName('');
    setQuantity('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add New Material</h2>
      <input value={name} onChange={e => setName(e.target.value)} placeholder="Material Name" required />
      <input value={quantity} onChange={e => setQuantity(e.target.value)} placeholder="Quantity" required />
      <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Description" />
      <button type="submit">Add Material</button>
    </form>
  );
}
