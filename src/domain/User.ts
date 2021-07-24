import {Model, ObjectID, Unique, MongoosePlugin} from "@tsed/mongoose";
import {Description, Hidden, Required, Email} from "@tsed/schema";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import * as mongooseBcrypt from "mongoose-bcrypt";
import * as bcrypt from "bcrypt";

@Model({schemaOptions: {timestamps: true}})
@MongoosePlugin(mongooseBcrypt)
export class User {
  @ObjectID("id")
  _id: string;

  @Required()
  @Description("The user name")
  name: string;

  @Unique()
  @Email()
  @Required()
  @Description("The user email")
  email: string;

  @Hidden()
  token: string;

  @Hidden()
  password: string;

  verifyPasswordSync(candidatePassword: string) {
    return bcrypt.compareSync(candidatePassword, this.password);
  }
}
