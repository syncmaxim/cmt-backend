import { Document } from 'mongoose';

export interface EventInterface extends Document {
  title: string;
  start: Date;
  end: Date;
  place: string;
  address: string;
  description: string;
  speakers: SpeakersInterface[]
}

export interface SpeakersInterface {
  fullName: string;
  presentationTitle: string;
  from: string;
  company: string;
}
