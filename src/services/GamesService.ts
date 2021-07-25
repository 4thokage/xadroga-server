import {Inject, Service} from "@tsed/common";
import {MongooseModel} from "@tsed/mongoose";
import {Game} from "../domain/Game";

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

  /**
   *
   * @param game, the game object to save in db
   * @returns {Promise<User>}
   */
  async save(game: Game): Promise<Game> {
    const model = new this.Game(game);
    return model.updateOne(game, {upsert: true});
  }
}
