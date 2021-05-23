import { customAlphabet } from 'nanoid';

// add default params to this function
// write tests for it
export const generateShortUrl = () => {
  const chars = '1234567890abcdefghijklmnopqrstuvwxyz';
  const domain = 'pbid.io';
  const protocol = 'https';
  const nanoid = customAlphabet(chars, 8);
  return `${protocol}://${domain}/${nanoid()}`;
};
