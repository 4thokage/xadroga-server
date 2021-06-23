// @ts-ignore
import * as SocketIO from "socket.io";
import {Game} from "./Game";

export type SocketSG = SocketIO.Socket & {
  game: Game
};
