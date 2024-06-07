import type { Request, Response, CookieOptions } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { escape } from "validator";

import { type IUser, UserModel } from "../model/user.model";
import { UserErrors } from "../common/errors";
import { registerSchema, loginSchema } from "../schema/auth.schema";
import {
  generateAccessToken,
  generateRefreshTokens,
} from "../utils/generateToken";

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

    const { refreshToken, refreshTokenExpiry } = generateRefreshTokens(
      user._id!
    );

    user.refreshToken = refreshToken;
    user.refreshTokenExpiry = refreshTokenExpiry;
    await user.save();

    const cookieOptions: CookieOptions = {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: Number(process.env.REFRESH_TOKEN_MAXAGE),
    };

    res.cookie("refresh_token", refreshToken, cookieOptions);
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

interface RefreshTokenPayload {
  id: string;
  iat: number;
  exp: number;
}
interface RefreshTokenRequest extends Request {
  refreshTokenPayload?: RefreshTokenPayload;
}

export const generateTokens = async (
  req: RefreshTokenRequest,
  res: Response
) => {
  try {
    const { access_token, refresh_token } = req.cookies;
    if (!access_token && !refresh_token) {
      return res.sendStatus(401);
    }

    const payload = jwt.verify(
      refresh_token,
      process.env.REFRESH_TOKEN_SECRET!
    ) as RefreshTokenPayload;
    req.refreshTokenPayload = payload;

    const user = await UserModel.findOne({ _id: req.refreshTokenPayload?.id });
    if (!user) {
      return res.sendStatus(403);
    }

    if (
      user.refreshToken !== refresh_token ||
      user.refreshTokenExpiry < new Date()
    ) {
      return res.status(403).json({ message: "Please login again." });
    }

    const { id, username } = user;
    const accessToken = generateAccessToken({ id: id.toString(), username });

    const cookieOptions: CookieOptions = {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: user.refreshTokenExpiry.getTime() - Date.now(),
    };

    console.log("Refreshing token");
    res.cookie("refresh_token", user.refreshToken, cookieOptions);
    res.cookie("access_token", accessToken, {
      maxAge: Number(process.env.ACCESS_TOKEN_MAXAGE),
    });
    return res.status(200).json({ message: "Token Refreshed" });
  } catch (error) {
    return res.sendStatus(403);
  }
};
