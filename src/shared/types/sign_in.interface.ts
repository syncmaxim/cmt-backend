import { Document } from 'mongoose';

export interface ISignIn extends Document {
  email: string;
  password: string;
}
