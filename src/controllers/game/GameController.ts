import {Controller, Get, PathParams} from "@tsed/common";
import {NotFound} from "@tsed/exceptions";
import {Required, Returns, Summary} from "@tsed/schema";
import {User} from "../../models/User";
import {UsersService} from "../../services/UsersService";
import {Game} from "../../models/Game";
import {GamesService} from "../../services/GamesService";

@Controller({
  path: "/games",
})
export class GameController {
  constructor(private gamesService: GamesService) {

  }

  @Get("/:id")
  @Summary("Return a game by its ID")
  @Returns(200,  Game)
  async get(@Required() @PathParams("id") id: string): Promise<Game> {

    const game = await this.gamesService.findById(id);

    if (game) {
      return game;
    }

    throw new NotFound("Game not found");
  }

}
