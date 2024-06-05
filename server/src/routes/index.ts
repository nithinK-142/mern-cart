import { Router } from "express";
import { productRouter } from "./product.routes";
import { userRouter } from "./user.routes";

const router = Router();

router.use("/api/user", userRouter);
router.use("/api/product", productRouter);

export default router;
