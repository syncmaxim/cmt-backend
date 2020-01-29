import {arrayProp, modelOptions, prop} from "@typegoose/typegoose";

export class Event {
  @prop()
  public id: string;
}

@modelOptions({schemaOptions: { versionKey: false }})
export class User {
  @prop({required: true})
  public email: string;

  @prop({required: true})
  public password: string;

  @arrayProp({items: Event, _id: false})
  public events: Event[];
}
