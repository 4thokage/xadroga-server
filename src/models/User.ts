import {Model, ObjectID, PreHook, Unique} from "@tsed/mongoose";
import {Description, Hidden, Required, Email, Property} from "@tsed/schema";
import * as bcrypt from "bcrypt";


@Model({schemaOptions : { timestamps: true}})
export class User{

  @ObjectID("id")
  _id: string;

  @Required()
  @Description("The user name")
  name: string;

  @Unique()
  @Email()
  @Required()
  @Description("The user email")
  email : string

  @Hidden()
  token: string;

  password: string

  @PreHook("save")
  static preSave(user: User, next: any) {

    // only hash the password if it has been modified (or is new)
    // if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(8, function(err, salt) {
      if (err) return next(err);

      // hash the password using our new salt
      bcrypt.hash(user.password, salt, function(errHash, hash) {
        if (errHash) return next(errHash);
        // override the cleartext password with the hashed one
        user.password = hash;
        next();
      });
    });
  }

  comparePassword(candidatePassword: string, cb: any) {
    return bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
      if (err) return cb(err);
      cb(null, isMatch);
    });
  }
}
