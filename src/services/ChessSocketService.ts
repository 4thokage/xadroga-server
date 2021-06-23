import {SocketMiddlewareLogger} from "../middlewares/SocketMiddlewareLogger";
import {Args, Broadcast, Emit, Input, IO, Socket, SocketService, SocketSession, SocketUseBefore} from "@tsed/socketio";
// @ts-ignore
import * as SocketIO from "socket.io";
import {$log} from "@tsed/logger";

@SocketService("/chess-game")
@SocketUseBefore(SocketMiddlewareLogger)
export class ChessSocketService {

  // a map to keep clients by any id you like, a userId or whatever.
  public clients: Map<string, Socket> = new Map();


  constructor(@IO private io: SocketIO.Server) {
  }

  $onConnection(@Socket socket: Socket, @SocketSession session: SocketSession) {
    $log.debug("New connection, ID =>", socket.id);

    this.clients.set(socket.id, socket);
  }

  @Input("client.chat.join")
  joinChat(@Args(0) username: string, @Args(1) roomId: any) {

    const socket = this.clients.get(roomId);
    if (!socket) return;
    socket.broadcast.emit("server.chat.user.join", {
      userId: username,
      username: username,
      text: `${username} has joined the chat`
    })
  }

  @Input("client.chat.message")
  sendChatMessage(@Args(0) username: string, @Args(1) ans: any,  @Args(2) roomId: string) {
    const socket = this.clients.get(roomId);
    if (!socket) return;
    socket.emit('server.chat.message', {});
  }

}
// For validating pawn promotion
// const validatePawnPromotion = (socket, chess, pendingMove) => {
//   const moves = chess.moves({ verbose: true })
//     for (let i = 0, len = moves.length; i < len; i++) {
//       if (moves[i].flags.indexOf("p") !== -1 && moves[i].from === pendingMove.from) {
//         socket.emit('promotion', pendingMove);
//         return true;
//       }
//     }
//   return false;
// };
//
// // For evaluating games which ended
// const evaluateGame = (chess, timedoutPlayer=undefined) => {
//
//   // Timeout evaluation
//   if(!chess){
//     if(!timedoutPlayer){
//       throw new Error('Either Chess state or timedout player details must be provided!');
//     }
//     return {
//       result: 'timeout',
//       timedoutPlayer
//     };
//   }
//
//   // Chess game evaluation
//   if (chess.in_checkmate()) {
//     return {
//       result: 'checkmate'
//     };
//   } else if (chess.in_stalemate()) {
//     return {
//       result: 'stalemate'
//     };
//   } else if (chess.in_threefold_repetition()) {
//     return {
//       result: 'threefold repetition'
//     };
//   } else if (chess.insufficient_material()) {
//     return {
//       result: 'insufficient material'
//     };
//   } else {
//     return {
//       result: '50 move rule'
//     };
//   }
//
// };
//
// module.exports = {
//   validatePawnPromotion,
//   evaluateGame
// };
