import {BodyParams, Controller, Get, PathParams, Post} from "@tsed/common";
import {NotFound} from "@tsed/exceptions";
import {Description, Required, Returns, Summary} from "@tsed/schema";
import {CreateGameRequest} from "../../domain/CreateGameRequest";
import {GameFactory} from "../../domain/GameFactory";
import {GamesService} from "../../services/GamesService";
import {Game} from "../../domain/Game";

@Controller({
  path: "/games"
})
export class GameController {
  constructor(private gamesService: GamesService) {}

  @Get("/:id")
  @Summary("Return a game from his ID")
  @Returns(200, Game)
  async get(@Required() @PathParams("id") id: string): Promise<Game> {
    const game = await this.gamesService.findById(id);

    if (game) {
      return game;
    }

    throw new NotFound("Game not found");
  }

  /**
   *
   * @param {Game} game
   * @returns {Promise<Game>}
   */
  @Post("/")
  @Summary("Create a new Game")
  @Returns(201, Game)
  save(
    @Description("Game model")
    @BodyParams()
    @Required()
    game: CreateGameRequest
  ) {
    return this.gamesService.save(GameFactory.newGame(game));
  }
}
