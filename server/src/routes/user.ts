import {
  Router,
  type Request,
  type Response,
  type NextFunction,
  type CookieOptions,
} from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { escape } from "validator";

const router = Router();

import {
  type IUser,
  UserModel,
  loginSchema,
  registerSchema,
} from "../models/user";
import { UserErrors } from "../common/errors";

router.post("/register", async (req: Request, res: Response) => {
  try {
    const { email, username, password } = registerSchema.parse({
      email: escape(req.body.email),
      username: escape(req.body.username),
      password: escape(req.body.password),
    });
    const user = await UserModel.findOne({ username });

    if (user) {
      return res.status(400).json({ type: UserErrors.USERNAME_ALREADY_EXISTS });
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
});

router.post("/login", async (req: Request, res: Response) => {
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

    const token = jwt.sign({ id: user._id }, process.env.SECRET as string);

    const cookieOptions: CookieOptions = {
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    };

    res.cookie("authToken", token, cookieOptions);

    res.json({ token, userID: user._id, username: user.username });
  } catch (err) {
    res.status(500).json({ type: err });
  }
});

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    jwt.verify(authHeader, process.env.SECRET as string, (err) => {
      if (err) {
        return res.sendStatus(403);
      }
      next();
    });
  } else {
    return res.sendStatus(401);
  }
};

router.get(
  "/available-money/:userID",
  verifyToken,
  async (req: Request, res: Response) => {
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
  }
);

export { router as userRouter };
