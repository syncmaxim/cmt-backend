import {arrayProp, modelOptions, prop} from '@typegoose/typegoose';
import { Speaker } from './speaker.model';
import * as mongoose from 'mongoose';
import {User} from '../../users/models/user.model';
import {Ref} from 'typegoose';

@modelOptions({schemaOptions: { versionKey: false }})
export class Event {
  @prop({required: true})
  public title: string;

  @prop({required: true})
  public start: Date;

  @prop({required: true})
  public end: Date;

  @prop({required: true})
  public place: string;

  @prop({required: true})
  public address: string;

  @prop({required: true})
  public description: string;

  @arrayProp({items: Speaker})
  public speakers: Speaker[];

  @prop({ref: 'User'})
  public attenders: Ref<User>[];
// , refType: mongoose.Schema.Types.ObjectId
  @prop()
  public userId: mongoose.Schema.Types.ObjectId;
}
