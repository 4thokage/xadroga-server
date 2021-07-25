import {Model, ObjectID} from "@tsed/mongoose";
import {Description, Property, Required} from "@tsed/schema";

@Model({schemaOptions: {timestamps: true}})
export class Game {
  @ObjectID("id")
  @Description("The game ID")
  _id: string;

  @Required()
  @Description("The game type")
  type: string;

  @Required()
  fen: string;

  @Property()
  pgn: string;

  @Property()
  state: string;

  @Required()
  createdBy: string;

  @Property()
  joinedBy: string[];

  @Property()
  @Description("The game total time limit in milliseconds")
  maxTimeMs: number;

  @Property()
  @Description("time compensation after each move in milliseconds")
  timeCompMs: number;

  @Property()
  sockets: string[];
}
