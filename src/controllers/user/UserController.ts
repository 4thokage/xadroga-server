
import {BodyParams, Controller, Delete, Get, PathParams, Post} from "@tsed/common";
import {NotFound} from "@tsed/exceptions";
import {Description, Required, Returns, Summary} from "@tsed/schema";
import {User} from "../../models/User";
import {UsersService} from "../../services/UsersService";
import {Authorize} from "@tsed/passport";

@Controller({
  path: "/users",
})
export class UserController {
  constructor(private usersService: UsersService) {

  }

  @Get("/:id")
  @Summary("Return a user from his ID")
  @Authorize("jwt")
  @Returns(200,  User)
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
  save(@Description("User model")
       @BodyParams() @Required() user: User) {
    return this.usersService.save(user);
  }

  /**
   *
   * @param id
   * @returns {{id: string, name: string}}
   */
  @Delete("/:id")
  @Summary("Remove a user.")
  @Authorize("jwt")
  @Returns(204)
  async remove(@PathParams("id") id: string): Promise<void> {
    await this.usersService.remove(id);
  }

  /**
   *
   * @returns {Promise<User[]>}
   */
  @Get("/")
  @Summary("Return all users")
  @Returns(200)
  @Authorize("admin")
  async getAllUsers(): Promise<User[]> {
    return this.usersService.query();
  }
}
