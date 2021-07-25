import {SocketMiddlewareLogger} from "../../middlewares/SocketMiddlewareLogger";
import {Args, Broadcast, Emit, Input, Socket, SocketService, SocketUseBefore} from "@tsed/socketio";
import {$log} from "@tsed/logger";

@SocketService("/chat")
@SocketUseBefore(SocketMiddlewareLogger)
export class ChatSocketService {
  /**
   * users in chat
   * @type {Map<string, any>}
   */
  public users: Map<string, any> = new Map();

  /**
   * triggered when a client connects to this namespace
   *
   * @param socket
   */
  $onConnection(@Socket socket: Socket) {
    $log.debug("New connection, ID =>", socket.id);
    socket.join("Lobby");
  }

  @Input("client.chat.mounted")
  @Emit("server.chat.mounted")
  mount(@Args(0) channel: string, @Socket socket: Socket) {
    return socket.id;
  }

  @Input("client.join.channel")
  joinChannel(@Args(0) channel: string, @Socket socket: Socket) {
    socket.join(channel);
  }

  @Input("client.leave.channel")
  leaveChannel(@Args(0) channel: string, @Socket socket: Socket) {
    socket.leave(channel);
  }

  @Input("client.new.channel")
  @Broadcast("server.new.channel")
  newChannel(@Args(0) channel: string, @Socket socket: Socket) {
    $log.debug("New connection, ID =>", socket.id);
    return channel;
  }

  @Input("client.new.message")
  @Broadcast("server.new.message")
  newMessage(@Args(0) msg: string, @Socket socket: Socket) {
    $log.debug("New connection, ID =>", socket.id);
    return msg;
  }
}
