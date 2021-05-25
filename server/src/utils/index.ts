import { customAlphabet } from 'nanoid';

const CHARS = '1234567890abcdefghijklmnopqrstuvwxyz';
const DOMAIN = 'pbid.io';
const PROTOCOL = 'https';
const NANOID = customAlphabet(CHARS, 8);

export const generateShortUrl = (
  domain = DOMAIN,
  protocol = PROTOCOL,
  nanoid = NANOID()
) => {
  return `${protocol}://${domain}/${nanoid}`;
};
