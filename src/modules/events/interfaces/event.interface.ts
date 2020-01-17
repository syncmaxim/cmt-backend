import { Document } from 'mongoose';

export interface EventInterface extends Document {
  title: string;
  start: Date;
  end: Date;
  place: string;
  address: string;
  description: string;
}
