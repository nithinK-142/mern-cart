import { Router } from "express";
import { verifyToken } from "../middleware/verifyToken.middleware";
import {
  getAllProducts,
  checkout,
  getPurchasedItems,
} from "../controller/product.controller";

const router = Router();

router.get("/", verifyToken, getAllProducts);
router.post("/checkout", verifyToken, checkout);
router.get("/purchased-items/:customerID", verifyToken, getPurchasedItems);

export { router as productRouter };
