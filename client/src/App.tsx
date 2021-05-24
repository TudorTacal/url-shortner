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
  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
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
    },
    [input]
  );
  const handleChange = useCallback((e: any) => {
    setInput(e.target.value);
  }, []);
  return (
    <div className='container'>
      {error && <div>Something went wrong</div>}
      <section className='form-section'>
        <form onSubmit={handleSubmit} className='form'>
          <fieldset className='fieldset'>
            <input
              className='shorten-url'
              required
              type='text'
              value={input}
              onChange={handleChange}
              placeholder='Shorten your link'
            />
            {invalidUrl && <p>{invalidUrl}</p>}
            <input className='shorten-button' type='submit' value='Shorten' />
          </fieldset>
        </form>
      </section>
      <section className='list-section'>
        <ul className='list'>
          {urls.map((url) => (
            <li key={url.id}>{url.url}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default App;
