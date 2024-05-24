import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [data, setData] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:5000/scrape-and-filter');
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data', error);
    }
    setLoading(false);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Web Scraper</h1>
        <button onClick={fetchData}>Fetch and Filter Data</button>
        {loading ? <p>Loading...</p> : <pre>{data}</pre>}
      </header>
    </div>
  );
}

export default App;
