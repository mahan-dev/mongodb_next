import { model, models, Schema } from "mongoose";

const userSchema = new Schema({
  name: {
    type: String,
    min: 4
  },
  lastName: String,
  email: String,
  createdAt: {
    type: Date,
    default : ()=> Date.now()
  }
});

export const UserSchema = models.UserSchema || model("UserSchema", userSchema);
export default UserSchema;
