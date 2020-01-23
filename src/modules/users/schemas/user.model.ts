import { prop } from "@typegoose/typegoose";

export class User {
  @prop()
  public email!: string;

  @prop()
  public password!: string;
}
