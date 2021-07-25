import {Description, Hidden} from "@tsed/schema";

export class UserResponse {
  @Description("The user name")
  name: string;

  @Hidden()
  @Description("The user email")
  email: string;
}
