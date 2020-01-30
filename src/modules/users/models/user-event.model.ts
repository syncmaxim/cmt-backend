import { prop } from '@typegoose/typegoose';

export class UserEvent {
  @prop()
  public id: string;
}
