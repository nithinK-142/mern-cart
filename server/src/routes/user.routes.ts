import { Router } from "express";
import {
  registerUser,
  loginUser,
  getAvailableMoney,
} from "../controller/user.controller";
import { verifyToken } from "../middleware/verifyToken.middleware";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/available-money/:userID", verifyToken, getAvailableMoney);

export { router as userRouter };
