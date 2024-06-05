import { Router } from "express";
import { productRouter } from "./product.routes";
import { userRouter } from "./user.routes";

const router = Router();

router.use("/api/v1/user", userRouter);
router.use("/api/v1/product", productRouter);

export default router;
