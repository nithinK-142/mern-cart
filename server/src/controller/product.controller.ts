import { type Request, type Response } from "express";
import { ProductModel } from "../model/product.model";
import { UserModel } from "../model/user.model";
import {
  checkoutSchema,
  purchasedItemsSchema,
} from "../schema/purchase.schema";
import { ProductErrors } from "../common/errors";

export const getAllProducts = async (_: Request, res: Response) => {
  try {
    const products = await ProductModel.find({});
    res.json({ products });
  } catch (err) {
    res.status(400).json({ err });
  }
};

export const checkout = async (req: Request, res: Response) => {
  const result = checkoutSchema.safeParse(req.body);
  if (!result.success) {
    return res
      .status(400)
      .json({ errors: result.error.formErrors.fieldErrors });
  }
  const { customerID, cartItems } = result.data;
  try {
    const user = await UserModel.findById(customerID);

    const productIDs = Object.keys(cartItems);
    const products = await ProductModel.find({ _id: { $in: productIDs } });

    if (!user) {
      return res.status(400).json({ type: ProductErrors.NO_USERS_FOUND });
    }

    if (products.length !== productIDs.length) {
      return res.status(400).json({ type: ProductErrors.NO_PRODUCT_FOUND });
    }

    let totalPrice = 0;
    for (const item in cartItems) {
      const product = products.find((product) => String(product._id) === item);

      if (!product) {
        return res.status(400).json({ type: ProductErrors.NO_PRODUCT_FOUND });
      }

      if (product.stockQuantity < cartItems[item]!) {
        return res.status(400).json({ type: ProductErrors.NOT_ENOUGH_STOCK });
      }

      totalPrice += product.price * cartItems[item]!;
    }

    if (user.availableMoney < totalPrice) {
      return res.status(400).json({ type: ProductErrors.NO_AVAILABLE_MONEY });
    }

    user.availableMoney -= totalPrice;
    user.purchasedItems.push(...productIDs);

    await user.save();

    await ProductModel.updateMany(
      { _id: { $in: productIDs } },
      { $inc: { stockQuantity: -1 } }
    );

    return res.json({ purchasedItems: user.purchasedItems });
  } catch (err) {
    console.error("Server Error:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getPurchasedItems = async (req: Request, res: Response) => {
  const result = purchasedItemsSchema.safeParse({
    customerID: req.params.customerID,
  });
  if (!result.success) {
    return res
      .status(400)
      .json({ errors: result.error.formErrors.fieldErrors });
  }
  const { customerID } = result.data;

  try {
    const user = await UserModel.findById(customerID);
    if (!user) {
      return res.status(400).json({ type: ProductErrors.NO_USERS_FOUND });
    }

    const products = await ProductModel.find({
      _id: { $in: user.purchasedItems },
    });
    res.json({ purchasedItems: products });
  } catch (err) {
    res.status(500).json({ type: err });
  }
};
