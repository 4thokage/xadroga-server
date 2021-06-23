import {Req} from "@tsed/common";
import {Arg, OnVerify, Protocol} from "@tsed/passport";
// @ts-ignore
import LichessStrategy from "passport-lichess";

@Protocol({
  name: "lichess",
  useStrategy: LichessStrategy,
  settings: {
    clientID: process.env.LICHESS_CLIENT_ID,
    clientSecret: process.env.LICHESS_CLIENT_SECRET,
    callbackURL: '/api/signin/lichess/callback',
    scope: ['email:read']
  }
})
export class LichessProtocol implements OnVerify {

  async $onVerify(@Req() req: Req, @Arg(0) jwtPayload: any) {
    return "TBD";
  }
}
