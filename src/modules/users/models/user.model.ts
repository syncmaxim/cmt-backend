import {modelOptions, prop} from '@typegoose/typegoose';
import * as mongoose from "mongoose";
import {Ref} from 'typegoose';
import {Event} from '../../events/models/event.model';

@modelOptions({schemaOptions: { versionKey: false }})
export class User {

  @prop()
  // public _id: mongoose.Schema.Types.ObjectId;
  public _id: string;

  @prop({required: true})
  public email: string;

  @prop({required: true})
  public password: string;

  @prop({ref: 'Event'})
  public events: Ref<Event>[];
  //, refType: mongoose.Schema.Types.ObjectId

  @prop({ref: 'Event'})
  public eventsToAttend: Ref<Event>[];
//  refType: mongoose.Schema.Types.ObjectId
}
