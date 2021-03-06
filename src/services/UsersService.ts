import {Inject, Service} from "@tsed/common";
import {MongooseModel} from "@tsed/mongoose";
import {$log} from "@tsed/logger";
import {User} from "../domain/User";

@Service()
export class UsersService {
  @Inject(User)
  private User: MongooseModel<User>;

  /**
   *
   * @param user, the user object to save in db
   * @returns {Promise<User>}
   */
  async save(user: User): Promise<User> {
    $log.debug({message: "Validate User", User});

    const model = new this.User(user);
    $log.debug({message: "Save User", user});
    await model.updateOne(user, {upsert: true});

    $log.debug({message: "User saved", model});

    return model;
  }

  /**
   *
   * @returns {User[]}
   */
  async query(options = {}): Promise<User[]> {
    return this.User.find(options).exec();
  }

  /**
   *
   * @param id, the user identifier
   * @returns {User}
   */
  async findById(id: string): Promise<User | null> {
    return this.User.findById(id).exec();
  }

  /**
   *
   * @param options
   * @returns {User}
   */
  async findOne(options = {}): Promise<User | null> {
    return this.User.findOne(options).exec();
  }


  async attachToken(user: User, token: string): Promise<User> {
    user.token = token;
    return this.save(user);
  }
}
