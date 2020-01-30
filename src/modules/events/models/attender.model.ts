import { prop } from '@typegoose/typegoose';

export class Attender {
  @prop({required: true})
  public id: string;
}
