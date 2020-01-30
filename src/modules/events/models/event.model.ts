import { arrayProp, modelOptions, prop } from '@typegoose/typegoose';
import { Speaker } from './speaker.model';
import { Attender } from './attender.model';

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

  @arrayProp({items: Attender, _id: false})
  public attenders: Attender[];

  @prop()
  public userId: string;
}
