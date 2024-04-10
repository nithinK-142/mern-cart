import { z } from "zod";

export const purchasedItemsSchema = z.object({
  customerID: z.string().trim().min(1, "Customer ID is required"),
});
