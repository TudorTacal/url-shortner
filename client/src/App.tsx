// @ts-nocheck
// type everything :)
import { useState, useCallback, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [input, setInput] = useState('');
  const [urls, setUrls] = useState([]);
  const [error, setError] = useState(null);
  useEffect(() => {
    try {
      const getUrls = async () => {
        const response = await axios.get('http://localhost:4000/urls');
        setUrls(response.data.urls);
      };
      getUrls();
    } catch (e) {
      setError(true);
    }
  }, []);
  const handleClick = useCallback(async () => {
    try {
      const response = await axios.post<{ url: string }>(
        'http://localhost:4000/url',
        {
          url: input,
        }
      );
      setUrls(response.data.urls);
      setInput(response.data.url.url);
    } catch (error) {
      setError(true);
    }
  }, [input]);
  const handleChange = useCallback((e: any) => {
    setInput(e.target.value);
  }, []);
  return (
    <div>
      {error && <div>Something went wrong</div>}
      <input
        type='text'
        value={input}
        onChange={handleChange}
        placeholder='Shorten your link'
      />
      <button onClick={handleClick}>Shorten</button>
      <ul>
        {urls.map((url) => (
          <li>{url.url}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
