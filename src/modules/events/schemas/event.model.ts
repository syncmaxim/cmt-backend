import { arrayProp, modelOptions, prop } from "@typegoose/typegoose";

export class Speaker {
  @prop()
  public fullName!: string;

  @prop()
  public presentationTitle!: string;

  @prop()
  public from!: string;

  @prop()
  public company: string;
}

@modelOptions({schemaOptions: { versionKey: false }})
export class Event {
  @prop()
  public title!: string;

  @prop()
  public start!: Date;

  @prop()
  public end!: Date;

  @prop()
  public place!: string;

  @prop()
  public address!: string;

  @prop()
  public description!: string;

  @arrayProp({items: Speaker})
  public speakers: Speaker[];
}

