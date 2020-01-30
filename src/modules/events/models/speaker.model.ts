import { prop } from '@typegoose/typegoose';

export class Speaker {
  @prop({required: true})
  public fullName: string;

  @prop({required: true})
  public presentationTitle: string;

  @prop({required: true})
  public company: string;
}
