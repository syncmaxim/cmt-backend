import { modelOptions, prop } from "@typegoose/typegoose";

@modelOptions({schemaOptions: { versionKey: false }})
export class User {
  @prop()
  public email!: string;

  @prop()
  public password!: string;
}
