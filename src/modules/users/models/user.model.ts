import {modelOptions, prop} from '@typegoose/typegoose';
import {arrayProp, Ref} from 'typegoose';
import {Event} from '../../events/models/event.model';

@modelOptions({schemaOptions: { versionKey: false }})
export class User {

  @prop({required: true})
  public email: string;

  @prop({required: true})
  public password: string;

  @prop({ref: 'Event'})
  public events: Ref<Event>[];

  @prop({ref: 'Event'})
  public eventsToAttend: Ref<Event>[];
}
