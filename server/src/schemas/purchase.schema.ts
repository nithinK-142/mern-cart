import { z } from "zod";

export const purchaseSchema = z.object({
  customerID: z.string().trim().min(1, "Customer ID is required"),
  cartItems: z
    .record(z.number().positive("Cart item quantity must be positive"))
    .refine((items) => Object.values(items).some((qty) => qty > 0), {
      message: "At least one item must be in the cart",
    }),
});

export const checkoutSchema = purchaseSchema.pick({
  customerID: true,
  cartItems: true,
});

export const purchasedItemsSchema = purchaseSchema.pick({
  customerID: true,
});
