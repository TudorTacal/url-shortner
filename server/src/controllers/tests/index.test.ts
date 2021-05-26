import request from 'supertest';
import mongoose from 'mongoose';
import { server } from '../../server';
import UrlModel from '../../models/url';
import { Url } from '../../types/url';

declare global {
  namespace NodeJS {
    interface Global {
      document: Document;
      window: Window;
      navigator: Navigator;
      MONGO_USER: string;
      MONGO_PASSWORD: string;
      MONGO_DB: string;
    }
  }
}

jest.mock('nanoid', () => ({
  customAlphabet: jest.fn().mockReturnValue(() => 'test-hash'),
}));

describe('Url controller', () => {
  beforeAll(async () => {
    const uri: string = `mongodb+srv://${global.MONGO_USER}:${global.MONGO_PASSWORD}@cluster0.vztwr.mongodb.net/${global.MONGO_DB}?retryWrites=true&w=majority`;
    const options = { useNewUrlParser: true, useUnifiedTopology: true };
    mongoose.set('useFindAndModify', false);
    await mongoose.connect(uri, options);
  });
  afterEach(async () => {
    await UrlModel.deleteMany();
    jest.restoreAllMocks();
    jest.resetAllMocks();
  });
  afterAll(async () => {
    await mongoose.connection.close();
  });
  describe('GET urls', () => {
    it('should return a list of urls', async () => {
      const longUrl = 'https:www.testurl.com';
      const shortUrl = 'https://pbid/testhash';
      const url: Url = new UrlModel({ longUrl, shortUrl });
      await url.save();
      const res = await request(server).get('/urls');
      expect(res.status).toEqual(200);
      expect(res.body.urls[0].longUrl).toEqual(longUrl);
      expect(res.body.urls[0].shortUrl).toEqual(shortUrl);
    });
    it('should return a 500 when error is encountered', async () => {
      // @ts-ignore
      jest.spyOn(UrlModel, 'find').mockImplementation(() => ({
        sort: jest.fn().mockRejectedValue(new Error('failed search')),
      }));
      const res = await request(server).get('/urls');
      expect(res.status).toEqual(500);
      expect(res.body.message).toEqual('failed search');
    });
  });
  describe('POST url', () => {
    it('should return a validation message if url is invalid', async () => {
      const invalidUrl = 'invalid-url';
      const res = await request(server).post('/url').send({
        longUrl: invalidUrl,
      });
      expect(res.status).toEqual(200);
      expect(res.body).toMatchInlineSnapshot(`
        Object {
          "statusCode": 400,
          "statusText": "Unable to shorten that link. It is not a valid URL.",
        }
      `);
    });
    it('should create a new url', async () => {
      const testUrl = 'http://www.testurl/com';
      const res = await request(server).post('/url').send({
        longUrl: testUrl,
      });
      expect(res.status).toEqual(201);
      expect(res.body.message).toEqual('Url added');
      expect(res.body.url.longUrl).toEqual(testUrl);
      expect(res.body.url.shortUrl).toEqual('https://pbid.io/test-hash');
    });
    it('should return a 500 when error is encountered', async () => {
      // @ts-ignore
      jest.spyOn(UrlModel, 'find').mockImplementation(() => ({
        sort: jest.fn().mockRejectedValue(new Error('failed search')),
      }));
      const testUrl = 'http://www.testurl/com';
      const res = await request(server).post('/url').send({
        longUrl: testUrl,
      });
      expect(res.status).toEqual(500);
      expect(res.body.message).toEqual('failed search');
    });
  });
});
