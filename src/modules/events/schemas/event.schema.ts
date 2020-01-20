import * as mongoose from 'mongoose';

export const EventSchema = new mongoose.Schema({
  title: String,
  start: Date,
  end: Date,
  place: String,
  address: String,
  description: String,
  speakers: {
    type: [{
      fullName: String,
      presentationTitle: String,
      from: String,
      company: String
    }]
  }
}, { versionKey: false });
