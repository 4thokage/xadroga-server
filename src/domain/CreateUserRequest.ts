import {Unique} from "@tsed/mongoose";
import {Description, Email, Hidden, Required} from "@tsed/schema";

export class CreateUserRequest {
  @Required()
  @Description("The user name")
  name: string;

  @Unique()
  @Email()
  @Required()
  @Description("The user email")
  email: string;

  @Hidden()
  @Required()
  @Description("The user password")
  password: string;
}
