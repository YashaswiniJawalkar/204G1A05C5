import React, { useState, useEffect } from 'react';

function NumberManagementService() {
  const [mergedNumbers, setMergedNumbers] = useState([]);
  const [inputUrls, setInputUrls] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const urls = inputUrls.split('\n').filter((url) => url.trim() !== '');
    fetchNumbers(urls);
  };

  async function fetchNumbers(urls) {
    try {
      const promises = urls.map(async (url) => {
        const response = await fetch(url);
        const data = await response.json();
        return data.numbers;
      });

      const numbersArrays = await Promise.all(promises);
      const merged = numbersArrays
        .flat()
        .filter((num, index, arr) => arr.indexOf(num) === index)
        .sort((a, b) => a - b);
      setMergedNumbers(merged);
      setError('');
    } catch (error) {
      console.error('Error fetching numbers:', error);
      setError('An error occurred while fetching numbers.');
    }
  }

  return (
    <div>
      <h1>Merged Unique Numbers</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={inputUrls}
          onChange={(e) => setInputUrls(e.target.value)}
          placeholder="Enter URLs, one per line"
          rows={4}
        />
        <button type="submit">Fetch Numbers</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <p>{JSON.stringify({ numbers: mergedNumbers })}</p>
    </div>
  );
}

export default NumberManagementService;

