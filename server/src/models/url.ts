import { Url } from '../types/url';
import { model, Schema } from 'mongoose';

const UrlSchema: Schema = new Schema({
  url: {
    type: String,
    required: true,
  },
});

export default model<Url>('Url', UrlSchema);
