import {Model, ObjectID, Unique} from "@tsed/mongoose";
import {Description, Email, Property, Required} from "@tsed/schema";
import * as bcrypt from "bcrypt";

@Model({schemaOptions: {timestamps: true}})
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

  @Property()
  token: string;

  @Property()
  password: string;

  verifyPasswordSync(candidatePassword: string) {
    return bcrypt.compareSync(candidatePassword, this.password);
  }
}
