import { Schema, model } from "mongoose";
import { z } from "zod";

export interface IProduct {
  productName: string;
  price: number;
  description: string;
  imageURL: string;
  stockQuantity: number;
}

const ProductSchema = new Schema<IProduct>({
  productName: { type: String, required: true },
  price: {
    type: Number,
    required: true,
    min: [1, "Prce should be more than 1"],
  },
  description: { type: String, required: true },
  imageURL: { type: String, required: true },
  stockQuantity: {
    type: Number,
    required: true,
    min: [0, "Stock can't be lower than 0"],
  },
});

export const ProductModel = model<IProduct>("product", ProductSchema);

export const checkoutSchema = z.object({
  customerID: z.string().trim().min(1, "Customer ID is required"),
  cartItems: z
    .record(z.number().positive("Cart item quantity must be positive"))
    .refine((items) => Object.values(items).some((qty) => qty > 0), {
      message: "At least one item must be in the cart",
    }),
});

export const purchasedItemsSchema = z.object({
  customerID: z.string().trim().min(1, "Customer ID is required"),
});
