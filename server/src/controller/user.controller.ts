import type { Request, Response } from "express";
import bcrypt from "bcrypt";
import { escape } from "validator";

import { type IUser, UserModel } from "../model/user.model";
import { UserErrors } from "../common/errors";
import { registerSchema, loginSchema } from "../schema/auth.schema";
import { generateAccessToken } from "../utils/generateToken";

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { email, username, password } = registerSchema.parse({
      email: escape(req.body.email),
      username: escape(req.body.username),
      password: escape(req.body.password),
    });

    const existingUser = await UserModel.findOne({
      $or: [{ username }, { email }],
    });

    if (existingUser) {
      return res.status(400).json({ type: UserErrors.USER_ALREADY_EXISTS });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new UserModel({
      email,
      username,
      password: hashedPassword,
    });

    await newUser.save();

    res.json({ message: "User Registration Complete!" });
  } catch (err) {
    res.status(500).json({ type: err });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { username, password } = loginSchema.parse({
      username: escape(req.body.username),
      password: escape(req.body.password),
    });
    const user: IUser | null = await UserModel.findOne({ username });
    if (!user) {
      return res.status(400).json({ type: UserErrors.NO_USER_FOUND });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ type: UserErrors.WRONG_CREDENTIALS });
    }

    const accessToken = generateAccessToken({
      id: user._id!,
      username: user.username,
    });

    res.cookie("access_token", accessToken, {
      maxAge: Number(process.env.ACCESS_TOKEN_MAXAGE),
    });

    res.json({ access_token: accessToken });
  } catch (err) {
    res.status(500).json({ type: err });
  }
};

export const getAvailableMoney = async (req: Request, res: Response) => {
  const { userID } = req.params;

  try {
    const user = await UserModel.findById(userID);
    if (!user) {
      return res.status(400).json({ type: UserErrors.NO_USER_FOUND });
    }
    const encodedAvailableMoney = escape(user.availableMoney.toString());

    res.json({ availableMoney: encodedAvailableMoney });
  } catch (err) {
    res.status(500).json({ type: err });
  }
};
