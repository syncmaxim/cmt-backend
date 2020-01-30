import {arrayProp, modelOptions, prop} from '@typegoose/typegoose';
import { UserEvent } from './user-event.model';
import { EventToAttend } from './event-to-attend';

@modelOptions({schemaOptions: { versionKey: false }})
export class User {
  @prop({required: true})
  public email: string;

  @prop({required: true})
  public password: string;

  @arrayProp({items: UserEvent, _id: false})
  public events: UserEvent[];

  @arrayProp({items: EventToAttend, _id: false})
  public eventsToAttend: EventToAttend[];
}
