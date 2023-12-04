import { Router, Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const router = Router();

import { IUser, UserModel } from "../models/user";
import { UserErrors } from "../common/errors";

// Middleware to verify access token
export const verifyToken = (req: Request, res: Response, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    jwt.verify(authHeader, "secret", (err) => {
      if (err) {
        if (err.name === 'TokenExpiredError') {
          return res.status(401).json({ type: 'TokenExpired', message: 'Token has expired' });
        }
        return res.sendStatus(403);
      }
      next();
    });
  } else {
    return res.sendStatus(401);
  }
};

// Register route
router.post("/register", async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    const user = await UserModel.findOne({ username });

    if (user) {
      return res.status(400).json({ type: UserErrors.USERNAME_ALREADY_EXISTS });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new UserModel({ username, password: hashedPassword });

    await newUser.save();

    res.json({ message: "User Registration Complete!" });
  } catch (err) {
    res.status(500).json({ type: err });
  }
});

// Login route
router.post("/login", async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    const user: IUser = await UserModel.findOne({ username });
    if (!user) {
      return res.status(400).json({ type: UserErrors.NO_USER_FOUND });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ type: UserErrors.WRONG_CREDENTIALS });
    }

    // Generate access token with expiration time
    const token = jwt.sign({ id: user._id }, "secret", { expiresIn: '1h' });
    res.json({ token, userID: user._id });
  } catch (err) {
    res.status(500).json({ type: err });
  }
});

// Refresh token route
router.post("/refresh-token", async (req: Request, res: Response) => {
  const refreshToken = req.cookies.refreshToken;

  // Verify the refresh token
  try {
    const decoded = jwt.verify(refreshToken, "refreshSecret");
    const user = await UserModel.findById(decoded.id);

    if (!user) {
      return res.status(400).json({ type: UserErrors.NO_USER_FOUND });
    }

    // Generate a new access token
    const newToken = jwt.sign({ id: user._id }, "secret", { expiresIn: '1h' });

    res.json({ token: newToken, userID: user._id });
  } catch (err) {
    return res.status(401).json({ type: 'TokenInvalid', message: 'Invalid refresh token' });
  }
});

// Protected route
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
      res.json({ availableMoney: user.availableMoney });
    } catch (err) {
      res.status(500).json({ type: err });
    }
  }
);

export { router as userRouter };
