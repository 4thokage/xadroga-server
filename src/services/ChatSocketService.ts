import {SocketMiddlewareLogger} from "../middlewares/SocketMiddlewareLogger";
import {
  Args,
  Broadcast, Emit,
  Input,
  Namespace,
  Nsp,
  Socket,
  SocketService,
  SocketSession,
  SocketUseBefore
} from "@tsed/socketio";

import * as SocketIO from "socket.io";
import {$log} from "@tsed/logger";
import {ChatClient} from "../models/ChatClient";

@SocketService("/socket-chat")
@SocketUseBefore(SocketMiddlewareLogger)
export class ChatSocketService {

  //chat clients
  public clients: Map<string, ChatClient> = new Map();


  @Nsp
  private nsp: Namespace;


  /**
   * triggered when a client connects to this namespace
   *
   * @param socket
   * @param session
   */
  $onConnection(@Socket socket: Socket, @SocketSession session: SocketSession) {
    $log.debug("New client, ID =>", socket.id);
    const chatClient = new ChatClient(socket.id);
    session.set("client", chatClient);

    this.nsp.emit("server.chat.client.new", chatClient);
    this.nsp.emit("server.chat.client.list", this.getClients());
  }

  /**
   * triggered when client disconnects from namespace
   * @param { SocketIO.Socket} socket
   */
  $onDisconnect(@Socket socket: SocketIO.Socket) {
    const client = this.clients.get(socket.id);
    if (client) {
      $log.debug("Client disconnected =>", client.id);

      this.clients.delete(client.id);
    }
  }

  @Input("client.call.user")
  @Broadcast("server.call.hello")
  public callUser(@Args(0) data: any, @SocketSession session: SocketSession) {
    return data;
  }

  @Input("client.call.accept")
  @Emit("server.call.accepted")
  public acceptCall(@Args(0) signal: any, @SocketSession session: SocketSession) {
    return signal;
  }

  @Input("client.chat.client.message")
  @Emit("server.chat.client.message")
  public sendMessage(@Args(0) message: string, @SocketSession session: SocketSession) {
    return message;
  }


  /**
   * Returns the list of clients
   * @returns {Array}
   */
  public getClients(): ChatClient[] {
    const clients: ChatClient[] = [];
    this.clients.forEach(e => clients.push(e));

    return clients;
  }

}
