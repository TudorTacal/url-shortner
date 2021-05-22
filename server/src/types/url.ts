import { Document } from 'mongoose';

export interface Url extends Document {
  url: string;
}
