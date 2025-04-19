import React, { useState } from 'react';
import { db, auth } from '../../firebase'; 
import { ref, push } from 'firebase/database';
import './SellerStyles.css';

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

    const user = auth.currentUser;

    if (!user) {
      alert("You must be logged in to upload materials.");
      return;
    }

    const materialRef = ref(db, 'materials/');
    console.log("Uploading material as seller:", user.uid);

    push(materialRef, {
      name,
      quantity: quantityNum,
      description,
      seller_id: user.uid, 
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
        alert("Failed to add material. " + error.message);
      });
  };

  return (
    <div className="material-form-container">
      <form onSubmit={handleSubmit} className="material-form">
        <h2>Add New Material</h2>

        <input
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Material Name"
          required
          className="material-input"
        />
        <input
          value={quantity}
          onChange={e => setQuantity(e.target.value)}
          placeholder="Quantity"
          required
          className="material-input"
        />
        <textarea
          value={description}
          onChange={e => setDescription(e.target.value)}
          placeholder="Description"
          required
          className="material-textarea"
        />
        <button type="submit" className="submit-button">Add Material</button>
      </form>
    </div>
  );
}
