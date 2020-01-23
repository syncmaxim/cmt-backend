import { Document } from 'mongoose';

export interface IEvent extends Document {
  title: string;
  start: Date;
  end: Date;
  place: string;
  address: string;
  description: string;
  speakers: ISpeaker[]
}

export interface ISpeaker {
  fullName: string;
  presentationTitle: string;
  from: string;
  company: string;
}
