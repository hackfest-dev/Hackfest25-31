import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { ref, onValue } from 'firebase/database';

export default function MaterialSearch() {
  const [query, setQuery] = useState('');
  const [materials, setMaterials] = useState([]);
  const [results, setResults] = useState([]);

  useEffect(() => {
    const materialRef = ref(db, 'materials/');
    onValue(materialRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const arr = Object.values(data);
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

  return (
    <div style={{ padding: '20px' }}>
      <h2>🔍 Search Materials</h2>
      <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Enter material name or keywords" />
      <button onClick={handleSearch}>Search</button>

      {results.map((mat, idx) => (
        <div key={idx}>
          <h4>{mat.name} - {mat.match_score}% Match</h4>
          <p>{mat.description}</p>
        </div>
      ))}
    </div>
  );
}
