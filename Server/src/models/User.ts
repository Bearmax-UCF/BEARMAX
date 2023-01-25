import { Model, Schema, Types, HydratedDocument, model } from "mongoose";
import bcrypt from "bcrypt";

interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  oldPasswords?: Types.Array<string>;
  accountType?: boolean;
}

interface IUserMethods {
  comparePassword(password: string): Promise<boolean>;
}

interface UserModel extends Model<IUser, {}, IUserMethods> {
}

/*
registerUser(user: IUser): Promise<HydratedDocument<IUser, IUserMethods>>;

declare global {
  namespace Express {
    interface User {
    }
  }
}
*/

const UserSchema = new Schema<IUser, UserModel, IUserMethods>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  oldPasswords: { type: Array },
  accountType: { type: Boolean },
});

UserSchema.pre("save", function (next) {
  // If password is not modified, save user as normal
  if (!this.isModified("password")) return next();

  // If password is modified, save its hash
  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err);
    bcrypt.hash(this.password, salt, (err, hash) => {
      if (err) return next(err);

      this.password = hash;

      return next();
    });
  });
});

// Methods

UserSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

// Statics


const User = model<IUser, UserModel>("users", UserSchema);

export default User;
