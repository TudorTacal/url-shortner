import { useState, useCallback, useEffect, FC } from 'react';
import axios from 'axios';
import { UrlResponse, Url, UrlsResponse } from './types';
import './App.css';

const App: FC = () => {
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState<string>('');
  const [urls, setUrls] = useState<Url[]>([]);
  const [error, setError] = useState(false);
  const [invalidUrl, setInvalidUrl] = useState<string | undefined>();
  useEffect(() => {
    const getUrls = async () => {
      setLoading(true);
      setError(false);
      try {
        const response: UrlsResponse = await axios.get(
          'http://localhost:4000/urls'
        );
        setUrls(response.data.urls);
      } catch (e) {
        setError(true);
      }
      setLoading(false);
    };
    getUrls();
  }, []);
  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setError(false);
      try {
        const response: UrlResponse = await axios.post(
          'http://localhost:4000/url',
          {
            longUrl: input,
          }
        );
        if (response.data.statusCode === 400) {
          setInvalidUrl(response.data.statusText);
        } else {
          setUrls(response.data.urls);
          setInput(response.data.url.shortUrl);
          setInvalidUrl('');
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
        {loading && <div>Fetching urls...</div>}
        <ul className='list'>
          {urls.map((url) => (
            <li key={url._id}>{url.shortUrl}</li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default App;
