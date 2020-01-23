import { Document } from 'mongoose';

export interface ISignUp extends Document {
  email: string;
  password?: string;
}
