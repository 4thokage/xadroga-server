import {SocketMiddlewareLogger} from "../../middlewares/SocketMiddlewareLogger";
import {
  Args,
  Broadcast,
  Emit,
  Input,
  Namespace,
  Nsp,
  Socket,
  SocketService,
  SocketSession,
  SocketUseBefore
} from "@tsed/socketio";
import {$log} from "@tsed/logger";

@SocketService("/chat")
@SocketUseBefore(SocketMiddlewareLogger)
export class ChatSocketService {

  /**
   * users in chat
   * @type {Map<string, any>}
   */
  public users: Map<string, any> = new Map();

  @Nsp
  private nsp: Namespace;

  /**
   * triggered when a client connects to this namespace
   *
   * @param socket
   * @param session
   */
  $onConnection(@Socket socket: Socket, @SocketSession session: SocketSession) {
    $log.debug("New connection, ID =>", socket.id);
    socket.join('Lobby')
  }

  @Input("client.chat.mounted")
  @Emit("server.chat.mounted")
  mount(@Args(0) channel: string, @Socket socket: Socket, @Namespace nsp: Namespace) {
    return socket.id;
  }

  @Input("client.join.channel")
  joinChannel(@Args(0) channel: string, @Socket socket: Socket, @Namespace nsp: Namespace) {
    socket.join(channel);
  }

  @Input("client.leave.channel")
  leaveChannel(@Args(0) channel: string, @Socket socket: Socket, @Namespace nsp: Namespace) {
    socket.leave(channel);
  }

  @Input("client.new.channel")
  @Broadcast("server.new.channel")
  newChannel(@Args(0) channel: string, @Socket socket: Socket, @Namespace nsp: Namespace) {
    return channel;
  }

  @Input("client.new.message")
  @Broadcast("server.new.message")
  newMessage(@Args(0) msg: string, @Socket socket: Socket, @Namespace nsp: Namespace) {
    return msg;
  }



}
