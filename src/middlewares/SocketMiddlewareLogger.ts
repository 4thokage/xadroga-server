import {Args, SocketMiddleware} from "@tsed/socketio";
import {$log} from "@tsed/logger";

@SocketMiddleware()
export class SocketMiddlewareLogger {

  async use(@Args() args: any[]) : Promise<any[]> {

    $log.debug("Socket", args);

    return args;
  }
}
