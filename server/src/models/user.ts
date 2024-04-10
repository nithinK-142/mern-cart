import { Schema, model, Document } from "mongoose";

export interface IUser extends Document {
  _id?: string;
  email: string;
  username: string;
  password: string;
  availableMoney: number;
  purchasedItems: string[];
}

const UserSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  availableMoney: { type: Number, default: 5000 },
  purchasedItems: [
    { type: Schema.Types.ObjectId, ref: "product", default: [] },
  ],
});

export const UserModel = model<IUser>("user", UserSchema);
