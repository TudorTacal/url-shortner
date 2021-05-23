import { customAlphabet } from 'nanoid';

export const generateShortUrl = () => {
  const chars = '1234567890abcdefghijklmnopqrstuvwxyz';
  const domain = 'pbid.io';
  const protocol = 'https';
  const nanoid = customAlphabet(chars, 8);
  return `${protocol}://${domain}/${nanoid()}`;
};
