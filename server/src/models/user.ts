import { Schema, model } from "mongoose";
import { z } from "zod";

export interface IUser {
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

export const registerSchema = z.object({
  email: z
    .string({ errorMap: () => ({ message: "Invalid email!" }) })
    .min(6)
    .max(30)
    .email(),
  username: z
    .string()
    .min(3, "Username is too short!")
    .max(20, "Username is too long!"),
  password: z
    .string()
    .min(6, "Password is too short!")
    .max(20, "Password is too long!"),
});

export const loginSchema = z.object({
  username: z
    .string()
    .min(3, "Username is too short!")
    .max(20, "Username is too long!"),
  password: z
    .string()
    .min(6, "Password is too short!")
    .max(20, "Password is too long!"),
});
