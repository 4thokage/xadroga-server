import {Inject, Service} from "@tsed/common";
import {MongooseModel} from "@tsed/mongoose";
import {Game} from "../models/Game";


@Service()
export class GamesService {
  @Inject(Game)
  private Game: MongooseModel<Game>;

  /**
   *
   * @param id, the game identifier
   * @returns {Game}
   */
  async findById(id: string): Promise<Game | null> {
    return this.Game.findById(id).exec();
  }

}
