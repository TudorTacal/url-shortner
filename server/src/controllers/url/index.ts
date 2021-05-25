import { Response, Request } from 'express';
import validUrl from 'valid-url';
import { Url } from '../../types/url';
import UrlModel from '../../models/url';
import { generateShortUrl } from '../../utils';

export const getUrls = async (req: Request, res: Response): Promise<void> => {
  try {
    const urls: Url[] = await UrlModel.find().sort({ _id: -1 });
    res.status(200).json({ urls });
  } catch (error) {
    throw error;
  }
};

export const addUrl = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      body: { longUrl },
    } = req;
    if (!validUrl.isWebUri(longUrl)) {
      res.status(200).json({
        statusCode: 400,
        statusText: 'Unable to shorten that link. It is not a valid URL.',
      });
    } else {
      const shortUrl = generateShortUrl();
      const url: Url = new UrlModel({ longUrl, shortUrl });
      const newUrl: Url = await url.save();
      const urls: Url[] = await UrlModel.find().sort({ _id: -1 });
      res.status(201).json({ message: 'Url added', url: newUrl, urls });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
