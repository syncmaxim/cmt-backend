import {modelOptions, mongoose, prop} from '@typegoose/typegoose';

@modelOptions({schemaOptions: { versionKey: false }})
export class User {
  @prop({required: true})
  public email: string;

  @prop({required: true})
  public password: string;

  @prop()
  public events: [];

  @prop()
  public eventsToAttend: [];
}
