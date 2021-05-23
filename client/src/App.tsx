// @ts-nocheck
// type everything :)
import { useState, useCallback, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [input, setInput] = useState('');
  const [urls, setUrls] = useState([]);
  const [error, setError] = useState(null);
  const [invalidUrl, setInvalidUrl] = useState('');
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
      if (response.data.statusCode === 400) {
        setInvalidUrl(response.data.statusText);
      } else {
        setUrls(response.data.urls);
        setInput(response.data.url.url);
        setInvalidUrl('');
        setError(null);
      }
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
      <div className='container'>
        <div>
          <input
            type='text'
            value={input}
            onChange={handleChange}
            placeholder='Shorten your link'
          />
          {invalidUrl && <p>{invalidUrl}</p>}
        </div>
        <button onClick={handleClick}>Shorten</button>
      </div>
      <ul>
        {urls.map((url) => (
          <li>{url.url}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
