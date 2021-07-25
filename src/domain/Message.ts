import {Model, ObjectID, Ref, Unique} from "@tsed/mongoose";
import {Description, Property, Required} from "@tsed/schema";
import {Channel} from "./Channel";
import {User} from "./User";

@Model()
export class Message {
  @ObjectID("id")
  _id: string;

  @Ref(Channel)
  channel: Ref<Channel>;

  @Property()
  text: string;

  @Ref(User)
  user: Ref<User>;

  @Property()
  time: Date;

}
