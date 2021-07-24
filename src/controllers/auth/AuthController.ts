import {BodyParams, Controller, Get, HeaderParams, Post, Req} from "@tsed/common";
import {Authenticate, Authorize} from "@tsed/passport";
import {Returns, Required} from "@tsed/schema";
import {User} from "../../domain/User";

@Controller("/auth")
export class AuthController {
  @Post("/login")
  @Authenticate("local")
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  login(@Req() req: Req, @Required() @BodyParams("email") email: string, @Required() @BodyParams("password") password: string) {
    return req.user;
  }

  @Get("/userinfo")
  @Authorize("jwt")
  @Returns(200, User)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getUserInfo(@Req() req: Req, @HeaderParams("authorization") token: string) {
    return req.user;
  }
}
