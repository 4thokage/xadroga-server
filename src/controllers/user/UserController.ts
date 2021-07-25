import {BodyParams, Controller, Get, PathParams, Post} from "@tsed/common";
import {NotFound} from "@tsed/exceptions";
import {Description, Required, Returns, Summary} from "@tsed/schema";
import {User} from "../../domain/User";
import {UsersService} from "../../services/UsersService";
import {Authorize} from "@tsed/passport";
import {CreateUserRequest} from "../../domain/CreateUserRequest";
import {UserFactory} from "../../domain/UserFactory";

@Controller({
  path: "/users"
})
export class UserController {
  constructor(private usersService: UsersService) {}

  @Get("/:id")
  @Summary("Return a user from his ID")
  @Authorize("jwt")
  @Returns(200, User)
  async get(@Required() @PathParams("id") id: string): Promise<User> {
    const user = await this.usersService.findById(id);

    if (user) {
      return user;
    }

    throw new NotFound("User not found");
  }

  /**
   *
   * @param {User} user
   * @returns {Promise<User>}
   */
  @Post("/")
  @Summary("Create a new User")
  @Returns(201, User)
  save(
    @Description("User model")
    @BodyParams()
    @Required()
    user: CreateUserRequest
  ) {
    return this.usersService.save(UserFactory.createUser(user));
  }
}
