import { Response, Request } from 'express';
import { Url } from '../../types/url';
import UrlModel from '../../models/url';

export const getUrls = async (req: Request, res: Response): Promise<void> => {
  try {
    const urls: Url[] = await UrlModel.find();
    res.status(200).json({ urls });
  } catch (error) {
    throw error;
  }
};

export const addUrl = async (req: Request, res: Response): Promise<void> => {
  try {
    const body = req.body as Url;

    const url: Url = new UrlModel({ url: body.url });

    const newUrl: Url = await url.save();
    const allUrls: Url[] = await UrlModel.find();

    res.status(201).json({ message: 'Url added', url: newUrl, urls: allUrls });
  } catch (error) {
    throw error;
  }
};