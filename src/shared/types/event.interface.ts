import { Document } from 'mongoose';
import {IUser} from './user.interface';
import {mongoose} from '@typegoose/typegoose';

export interface IEvent extends Document {
  title: string;
  start: Date;
  end: Date;
  place: string;
  address: string;
  description: string;
  speakers?: ISpeaker[];
  attenders?: IUser[];
  userId?: mongoose.Schema.Types.ObjectId;
}

export interface ISpeaker {
  fullName: string;
  presentationTitle: string;
  company: string;
}
