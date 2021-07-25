import {Model, ObjectID, Unique} from "@tsed/mongoose";
import {Description, Property, Required} from "@tsed/schema";

@Model({schemaOptions: {timestamps: true}})
export class Channel {
  @ObjectID("id")
  _id: string;

  @Required()
  @Unique()
  @Description("The channel name")
  name: string;

  @Property()
  private: boolean;

  @Property()
  between: string[];

}
