import {CreateGameRequest} from "./CreateGameRequest";
import {Game} from "./Game";
import {$log} from "@tsed/logger";

export class GameFactory {
  static newGame(game: CreateGameRequest): Game {
    $log.info(game);
    return new Game();
  }
}
