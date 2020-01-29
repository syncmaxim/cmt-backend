import { arrayProp, modelOptions, prop } from "@typegoose/typegoose";

export class Speaker {
  @prop({required: true})
  public fullName: string;

  @prop({required: true})
  public presentationTitle: string;

  @prop({required: true})
  public company: string;
}

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

  @prop()
  public userId: string;
}

