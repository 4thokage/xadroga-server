import {Indexed, Model, Ref} from "@tsed/mongoose";
import {Description, Required, Ignore} from "@tsed/schema";
import {User} from "./User";

@Model({schemaOptions : { timestamps: true}})
export class Game {


  @Ignore() // exclude _id from mongoose in the generated schema
  _id: string;

  @Indexed()
  @Required()
  @Description("The game ID")
  gameId: string;

  @Description("The game sate (FEN)")
  state: string;

  @Description("The game outcome")
  outcome: string

  @Ref(User)
  createdBy: Ref<User>

  @Ref(User)
  joinedBy: Ref<User>


}

