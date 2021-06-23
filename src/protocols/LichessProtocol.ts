import {Req} from "@tsed/common";
import {Arg, OnVerify, Protocol} from "@tsed/passport";


@Protocol({
  name: "lichess",
  useStrategy: require("passport-lichess").Strategy,
  settings: {
    clientID: process.env.LICHESS_CLIENT_ID,
    clientSecret: process.env.LICHESS_CLIENT_SECRET,
    callbackURL: "/api/signin/lichess/callback",
    scope: ["email:read"]
  }
})
export class LichessProtocol implements OnVerify {

  async $onVerify(@Req() req: Req, @Arg(0) jwtPayload: string) {
    return "TBD";
  }
}
