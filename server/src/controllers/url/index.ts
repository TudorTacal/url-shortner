import { Response, Request } from 'express';
// TODO: add declaration file for validate-url
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
    const body = req.body as Url;
    if (!validUrl.isWebUri(body.url)) {
      res.status(200).json({
        statusCode: 400,
        statusText: 'Unable to shorten that link. It is not a valid URL.',
      });
    } else {
      const shortUrl = generateShortUrl();
      const url: Url = new UrlModel({ url: shortUrl });

      const newUrl: Url = await url.save();
      const allUrls: Url[] = await UrlModel.find().sort({ _id: -1 });

      res
        .status(201)
        .json({ message: 'Url added', url: newUrl, urls: allUrls });
    }
  } catch (error) {
    throw error;
  }
};
