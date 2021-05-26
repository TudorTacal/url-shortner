import { AxiosResponse } from 'axios';

export interface Url {
  _id: string;
  longUrl: string;
  shortUrl: string;
}

export interface Urls {
  urls: Url[];
}
interface PostResponse {
  statusCode: number;
  statusText: string;
  url: Url;
  urls: Url[];
}
export interface UrlsResponse extends AxiosResponse<Urls> {}
export interface UrlResponse extends AxiosResponse<PostResponse> {}
