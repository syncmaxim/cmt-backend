import {arrayProp, modelOptions, prop, mongoose} from '@typegoose/typegoose';
import { Speaker } from './speaker.model';
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

  @arrayProp({ref: 'User'})
  public attenders: Ref<User>[];

  @prop()
  public userId: mongoose.Schema.Types.ObjectId;
}
