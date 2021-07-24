import {CreateUserRequest} from "./CreateUserRequest";
import {User} from "./User";

export class UserFactory {
  static createUser(user: CreateUserRequest): User {
    const res = new User();
    res.name = user.name;
    res.email = user.email;
    res.password = user.password;

    return res;
  }
}
