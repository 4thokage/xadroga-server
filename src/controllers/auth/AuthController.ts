import {BodyParams, Controller, Post, Req} from "@tsed/common";
import {Authenticate} from "@tsed/passport";
import {Required} from "@tsed/schema";

@Controller("/auth")
export class AuthController {
  @Post("/login")
  @Authenticate("local")
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  login(@Req() req: Req, @Required() @BodyParams("email") email: string, @Required() @BodyParams("password") password: string) {
    return req.user;
  }
}
