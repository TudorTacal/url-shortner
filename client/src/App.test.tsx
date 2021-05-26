import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios, { AxiosResponse } from 'axios';
import App from './App';

jest.mock('axios', () => ({
  get: jest.fn(),
  post: jest.fn(),
}));

const axiosResponse: AxiosResponse = {
  data: { urls: [] },
  status: 200,
  statusText: 'OK',
  config: {},
  headers: {},
};

describe('App', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });
  it('should render without crashing', async () => {
    (axios.get as jest.Mock).mockResolvedValue(axiosResponse);
    render(<App />);
    await waitFor(() => expect(axios.get).toHaveBeenCalledTimes(1));
    expect(
      screen.getByPlaceholderText(/shorten your link/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/shorten/i)).toBeInTheDocument();
  });
  it('should fetch and render a list of urls', async () => {
    const testUrl1 = 'https://www.testurl1.com';
    const shortUrl1 = 'https://pbid.io/test-hash1';
    const testUrl2 = 'https://www.testurl2.com';
    const shortUrl2 = 'https://pbid.io/test-hash2';
    (axios.get as jest.Mock).mockResolvedValue({
      ...axiosResponse,
      data: {
        urls: [
          { _id: 'test-id1', longUrl: testUrl1, shortUrl: shortUrl1 },
          { _id: 'test-id2', longUrl: testUrl2, shortUrl: shortUrl2 },
        ],
      },
    });
    render(<App />);
    expect(screen.getByText(/fetching urls.../i)).toBeInTheDocument();
    await waitFor(() => expect(axios.get).toHaveBeenCalledTimes(1));
    await waitFor(() =>
      expect(axios.get).toHaveBeenCalledWith('http://localhost:4000/urls')
    );
    expect(screen.getByText(shortUrl1)).toBeInTheDocument();
    expect(screen.getByText(shortUrl2)).toBeInTheDocument();
    expect(screen.queryByText(/fetching urls.../i)).not.toBeInTheDocument();
  });
  it('should render an error message if GET list is unsuccessful', async () => {
    (axios.get as jest.Mock).mockRejectedValue({});
    render(<App />);
    await waitFor(() => expect(axios.get).toHaveBeenCalledTimes(1));
    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
  });
  it('should type an url, make a POST request on submit and render the data in the list', async () => {
    const testUrl = 'https://www.testurl.com';
    const shortUrl = 'https://pbid.io/test-hash';
    (axios.get as jest.Mock).mockResolvedValue(axiosResponse);
    (axios.post as jest.Mock).mockResolvedValue({
      ...axiosResponse,
      data: {
        urls: [{ _id: 'test-id', longUrl: testUrl, shortUrl }],
        url: { shortUrl },
      },
    });
    render(<App />);
    const input = screen.getByPlaceholderText(/shorten your link/i);
    userEvent.type(input, testUrl);
    userEvent.click(screen.getByText(/shorten/i));
    await waitFor(() => expect(axios.post).toHaveBeenCalledTimes(1));
    await waitFor(() =>
      expect(axios.post).toHaveBeenCalledWith('http://localhost:4000/url', {
        longUrl: testUrl,
      })
    );
    expect(screen.getByText(shortUrl)).toBeInTheDocument();
  });
  it('should render a validation message if the url input is invalid', async () => {
    const testUrl = 'invalid-url-format';
    (axios.get as jest.Mock).mockResolvedValue(axiosResponse);
    (axios.post as jest.Mock).mockResolvedValue({
      ...axiosResponse,
      data: {
        statusCode: 400,
        statusText: 'Unable to shorten that link. It is not a valid URL.',
      },
    });
    render(<App />);
    const input = screen.getByPlaceholderText(/shorten your link/i);
    userEvent.type(input, testUrl);
    userEvent.click(screen.getByText(/shorten/i));
    await waitFor(() => expect(axios.post).toHaveBeenCalledTimes(1));
    expect(
      screen.getByText(/unable to shorten that link. it is not a valid url./i)
    ).toBeInTheDocument();
  });
  it('should render an error message if POST url is unsuccessful', async () => {
    const testUrl = 'https://www.testurl.com';
    (axios.get as jest.Mock).mockResolvedValue(axiosResponse);
    (axios.post as jest.Mock).mockRejectedValue({});
    render(<App />);
    const input = screen.getByPlaceholderText(/shorten your link/i);
    userEvent.type(input, testUrl);
    userEvent.click(screen.getByText(/shorten/i));
    await waitFor(() => expect(axios.post).toHaveBeenCalledTimes(1));
    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
  });
});
