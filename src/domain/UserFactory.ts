import {CreateUserRequest} from "./CreateUserRequest";
import {User} from "./User";
import * as bcrypt from "bcrypt";

export class UserFactory {
  static createUser(user: CreateUserRequest): User {
    const res = new User();
    res.name = user.name;
    res.email = user.email;

    res.password = bcrypt.hashSync(user.password, 10);

    return res;
  }
}
