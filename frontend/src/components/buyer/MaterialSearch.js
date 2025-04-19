import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { ref, onValue } from 'firebase/database';
import { useNavigate } from 'react-router-dom';

export default function MaterialSearch() {
  const [query, setQuery] = useState('');
  const [materials, setMaterials] = useState([]);
  const [results, setResults] = useState([]);
  const navigate = useNavigate(); 

  useEffect(() => {
    const materialRef = ref(db, 'materials/');
    onValue(materialRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const arr = Object.entries(data).map(([id, val]) => ({ id, ...val }));
        setMaterials(arr);
      }
    });
  }, []);

  const handleSearch = async () => {
    const response = await fetch("http://localhost:5000/match-materials", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query, materials })
    });
    const data = await response.json();
    setResults(data);
  };

  const handleChatClick = (sellerUID) => {
    console.log('Redirecting to chat with:', sellerUID);
    navigate(`/buyer/chat/${sellerUID}`);  
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2> Search Materials</h2>
      <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Enter material name or keywords" />
      <button onClick={handleSearch}>Search</button>

      {results.map((mat, idx) => (
        <div key={idx} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
          <h4>{mat.name} - {mat.match_score}% Match</h4>
          <p>{mat.description}</p>
          <p><b>Quantity:</b> {mat.quantity}</p>
          <p><b>Seller UID:</b> {mat.seller_id ? mat.seller_id : ' Not available'}</p>
          <button
            disabled={!mat.seller_id}
            onClick={() => handleChatClick(mat.seller_id)}  
          >
            Chat with Seller
          </button>
        </div>
      ))}
    </div>
  );
}
